const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./public/data/permits.json', 'utf8'));
const permits = Array.isArray(data) ? data : data.permits || data.data || [];

// Article number → project type mapping (Georgian EIA law annexes)
const ARTICLE_MAP = [
  // ჰიდროელექტროსადგური
  { type: 'ჰიდროელექტროსადგური', articles: ['22', '21', '3.8', '9.9', '9.10'] },
  // გზა / ინფრასტრუქტურა
  { type: 'გზა', articles: ['11', '12', '13', '9', '9.1', '9.3', '9.4', '9.5', '9.10'] },
  // ნარჩენების გადამუშავება
  { type: 'ნარჩენების გადამუშავება', articles: ['10.2', '10.3', '10.4', '10.5', '10.6', '10.7', '10.8', '16', '17'] },
  // სასარგებლო წიაღისეულის გადამუშავება — before სამთო to take priority
  { type: 'სასარგებლო წიაღისეულის გადამუშავება', articles: ['5.1', '5.3'] },
  // სამთომოპოვებითი
  { type: 'სამთომოპოვებითი', articles: ['2.1', '2.2', '2.3', '26', '5.2', '5.4', '5.5', '5.6', '5.7', '4.9', '6'] },
  // ელექტროგადამცემი
  { type: 'ელექტროგადამცემი', articles: ['3.4', '3.9', '28', '3.1'] },
  // ნავთობი და გაზი — must be before სასოფლო (1.2 overlap)
  { type: 'ნავთობი და გაზი', articles: ['1.2', '3.3', '3.5', '3.6', '6.3', '9.11', '29'] },
  // სასოფლო-სამეურნეო / მეცხოველეობა — 1.1 only if no oil keyword
  { type: 'სასოფლო-სამეურნეო', articles: ['1.3', '1.5', '1.6', '24', '7.1', '7.2', '7.6', '7.7', '7.8'] },
  // მეტალურგია / ქიმია
  { type: 'მეტალურგია და ქიმია', articles: ['4.1', '4.2', '4.3', '4.4', '4.5', '5', '6.1', '6.2', '8.1', '8.2', '8.3', '8.4', '8.5', '8.6'] },
  // სანაპირო / წყლის ნაგებობები
  { type: 'წყლის ნაგებობები', articles: ['1.7', '9.6', '9.7', '9.8', '9.13', '1.8', '10.1'] },
  // მშენებლობა / ტურიზმი
  { type: 'მშენებლობა', articles: ['9.2', '11.1', '11.2', '11.3', '11.4'] },
];

// Build lookup: article → type (longest match wins)
function classifyByArticles(text) {
  if (!text) return null;
  // Special case: "1.1. ნედლი ნავთობის გადამუშავება" → ნავთობი
  if (/1\.1[.\s].*ნავთობ/i.test(text) || /ნედლი ნავთობ/i.test(text)) return 'ნავთობი და გაზი';
  // Special case: text explicitly says სასარგებლო წიაღისეულის გადამუშავება
  if (/სასარგებლო წიაღისეულის გადამუშავება/i.test(text) || /გამამდიდრებელ/i.test(text) || /სამსხვრევ/i.test(text) || /დამახარისხებ/i.test(text)) return 'სასარგებლო წიაღისეულის გადამუშავება';
  // Extract article numbers like "3.4", "22", "10.6" from text
  const found = text.match(/\b(\d{1,2}\.\d{1,2}|\d{1,2})\b/g) || [];
  for (const { type, articles } of ARTICLE_MAP) {
    for (const art of articles) {
      if (found.includes(art)) return type;
    }
  }
  return null;
}

// Keyword fallback (for non-scoping records)
const KEYWORDS = [
  { type: 'ჰიდროელექტროსადგური', keywords: ['ჰიდროელექტროსადგური', 'ჰეს '] },
  { type: 'გზა', keywords: ['საავტომობილო გზ', 'გვირაბ', 'ხიდ', 'სარკინიგზო'] },
  { type: 'ნარჩენების გადამუშავება', keywords: ['ნარჩენ', 'გადამუშავება', 'ნაგავ', 'პოლიგონ'] },
  { type: 'სასარგებლო წიაღისეულის გადამუშავება', keywords: ['სასარგებლო წიაღისეულის გადამუშავება', 'გამამდიდრებელ', 'სამსხვრევ', 'დამახარისხებ', 'ასფალტ', 'ქვის გამ'] },
  { type: 'სამთომოპოვებითი', keywords: ['მაღარო', 'სამთო', 'მოპოვება', 'კარიერ', 'ოქრო', 'სპილენძ', 'rmg', 'gold'] },
  { type: 'ელექტროგადამცემი', keywords: ['ელექტროგადამცემ', 'ქვესადგურ', 'კვ ', '110 კვ', '220 კვ', '500 კვ'] },
  { type: 'ნავთობი და გაზი', keywords: ['ნავთობ', 'გაზ', 'ტერმინალ', 'ტანკ', 'რეზერვუარ', 'მილსადენ'] },
  { type: 'სასოფლო-სამეურნეო', keywords: ['სასოფლო', 'ფერმ', 'მეცხოველ', 'სათბური', 'აკვაკულტ', 'სამელიორ'] },
  { type: 'მეტალურგია და ქიმია', keywords: ['მეტალურგ', 'ლითონ', 'ქიმი', 'ცემენტ', 'ასფალტ'] },
  { type: 'მშენებლობა', keywords: ['სასტუმრო', 'საცხოვრებელ', 'ურბანულ', 'სავაჭრო ცენტრ'] },
];

function classifyByKeywords(text) {
  const lower = (text || '').toLowerCase();
  for (const { type, keywords } of KEYWORDS) {
    for (const kw of keywords) {
      if (lower.includes(kw.toLowerCase())) return type;
    }
  }
  return '';
}

let classified = 0;
let byArticle = 0;
let byKeyword = 0;

for (const p of permits) {
  const combined = `${p.project || ''} ${p.activity || ''}`;
  
  // Try article-based classification first (more precise for scoping/screening)
  let result = classifyByArticles(p.activity);
  if (result) { byArticle++; }
  else {
    result = classifyByKeywords(combined) || '';
    if (result) byKeyword++;
  }
  
  p.project_type = result;
  if (result) classified++;
}

fs.writeFileSync('./public/data/permits.json', JSON.stringify(permits, null, 2), 'utf8');

console.log(`Done. Classified ${classified} / ${permits.length} permits.`);
console.log(`  By article number: ${byArticle}`);
console.log(`  By keyword: ${byKeyword}`);
const stats = {};
for (const p of permits) { if (p.project_type) stats[p.project_type] = (stats[p.project_type] || 0) + 1; }
console.log('Distribution:', JSON.stringify(stats, null, 2));
