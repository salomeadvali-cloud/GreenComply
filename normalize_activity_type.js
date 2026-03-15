const fs = require('fs');

// Map keywords to canonical activity type names
const ACTIVITY_RULES = [
  // ენერგეტიკა
  { canonical: 'ჰიდროელექტროსადგური', keywords: ['ჰიდროელექტროსადგურ', 'ჰესის', 'ჰეს', 'ჰიდრელექტრო'] },
  { canonical: 'ქარის ელექტროსადგური', keywords: ['ქარის ელექტროსადგურ', 'ქარის ტურბინ'] },
  { canonical: 'მზის ელექტროსადგური', keywords: ['მზის ელექტროსადგურ', 'ფოტოვოლტ', 'მზის ენერგია', 'სოლარ'] },
  { canonical: 'თბოელექტროსადგური', keywords: ['თბოელექტროსადგურ'] },
  { canonical: 'ელექტროგადამცემი ხაზი', keywords: ['ელექტროგადამცემი ხაზ', 'ელექტრო გადამცემი', 'ეგხ', 'ქვესადგურ', 'ელექტრო და'] },

  // ნავთობი და გაზი
  { canonical: 'ნავთობპროდუქტების საცავი', keywords: ['ნავთობპროდუქტ', 'ნავთობბაზ', 'ნევთობ', 'ავტოგასამართ', 'ბენზინ', 'დიზელ', 'ნავთობის კოქს', 'საავიაციო საწვავ'] },
  { canonical: 'გაზსადენი', keywords: ['გაზსადენ', 'ბუნებრივი აირ', 'მილსადენ', 'გათხევადებ'] },
  { canonical: 'ნავთობის გადამუშავება', keywords: ['ნავთობგადამამუშავებ', 'ნედლი ნავთობ', 'ნავთობის კოქს'] },
  { canonical: 'საზღვაო ტერმინალი', keywords: ['საზღვაო ტერმინალ', 'ნავსადგურ', 'ნავმისადგომ', 'საკონტეინერო ტერმინალ'] },

  // სასარგებლო წიაღისეული
  { canonical: 'სასარგებლო წიაღისეულის გადამუშავება', keywords: ['სასარგებლო წიაღისეულის გადამ', 'სამსხვრევ-დამ', 'სამსხვრევ-დამხ', 'გამამდიდრებელ', 'ინერტული მასალ', 'ქვა-ღორღ', 'ქვიშ-ხრეში', 'ქვიშა-ხრეშ', 'ქვიშახრეშ', 'სასარგებლო წიაღისეულ'] },
  { canonical: 'ასფალტის წარმოება', keywords: ['ასფალტ'] },
  { canonical: 'სასარგებლო წიაღისეულის მოპოვება', keywords: ['მოპოვება', 'კარიერ', 'ღია კარიერ', 'ტორფ', 'ბაზალტ', 'ტუფ', 'კირქვ', 'კონგლომერატ', 'ანდეზიტ', 'ოქრო', 'ქვანახშ', 'მანგანუმ', 'სპილენძ', 'თიხ', 'გაჯ', 'ქვიშ', 'ხრეშ'] },

  // მეტალურგია
  { canonical: 'ფეროშენადნობების საწარმო', keywords: ['ფეროშენადნობ', 'სილიკომანგანუმ', 'ფეროქრომ'] },
  { canonical: 'ლითონის გადამუშავება', keywords: ['ლითონ', 'ალუმინ', 'ფოლადის', 'თუჯ', 'ფერადი ლითონ', 'შავი ლითონ', 'ფოლადი'] },
  { canonical: 'ცემენტის წარმოება', keywords: ['ცემენტ'] },
  { canonical: 'კირის/გაჯის წარმოება', keywords: ['კირ', 'გაჯ', 'თაბაშირ'] },
  { canonical: 'ქიმიური საწარმო', keywords: ['ქიმიურ', 'ქიმიის', 'სასუქ', 'ქიმ. წ', 'პლასტ', 'პოლიეთილენ', 'პოლიპროპილ', 'ლაქ-საღებ', 'საღებავ', 'ფისის', 'ელასტ', 'ფარმაც'] },

  // ნარჩენები
  { canonical: 'ნარჩენების განთავსება (პოლიგონი)', keywords: ['ნაგავსაყრელ', 'ნარჩენების განთავსება', 'სანიტარული პოლ'] },
  { canonical: 'ნარჩენების ინსინერაცია', keywords: ['ინსინერ', 'ნარჩენების ინს'] },
  { canonical: 'ნარჩენების გადამუშავება', keywords: ['ნარჩენ', 'ზეთების გადამ', 'პლასტმ', 'ქაღალდ', 'საბურავ', 'ნამუშ', 'კომპოსტ'] },
  { canonical: 'ჩამდინარე წყლების გამწმენდი', keywords: ['ჩამდინარე წყლ', 'გამწმენდი ნაგებობ', 'საკანალიზ', 'სალექარ'] },

  // ინფრასტრუქტურა
  { canonical: 'საავტომობილო გზა', keywords: ['საავტომობილო გზ', 'გზის მშენ', 'გზის მოწ', 'გზის რეკ', 'გვირაბ', 'ხიდ', 'სახიდ', 'ავტომაგ', 'შემოვლითი გზ'] },
  { canonical: 'სარკინიგზო ხაზი', keywords: ['სარკინიგზო', 'რკინიგზ'] },
  { canonical: 'აეროდრომი / აეროპორტი', keywords: ['აეროდრომ', 'აეროპ', 'საჰაერო ნავ', 'ვეტმფრენ'] },
  { canonical: 'ნაპირდაცვითი სამუშაოები', keywords: ['ნაპირდაცვ', 'ნაპირსამაგ', 'ნაპირდამ', 'გაბიონ', 'ეროზიის', 'წყალდიდობ', 'დატბორვ'] },

  // სოფლის მეურნეობა
  { canonical: 'სამელიორაციო სისტემა', keywords: ['სამელიორ', 'სარწყავი სისტ'] },
  { canonical: 'მეცხოველეობის ფერმა', keywords: ['ფერმ', 'მეფრინველ', 'მეღორ', 'მესაქონლ', 'სადგომ'] },
  { canonical: 'სასაკლაო', keywords: ['სასაკლ'] },
  { canonical: 'აკვაკულტურა / თევზსაშენი', keywords: ['თევზსაშ', 'აკვაკულტ', 'ტბორ', 'თევზის'] },

  // სხვა
  { canonical: 'ურბანული განვითარება', keywords: ['ურბანულ', 'საცხოვრებელ', 'სასტუმრო', 'კომპლექს'] },
  { canonical: 'წყლის მოპოვება', keywords: ['წყლის მოპ', 'მიწისქვეშა წყ', 'მინერალ. წყ'] },
];

function normalizeActivityType(text) {
  if (!text || !text.trim()) return '';
  const lower = text.toLowerCase();
  for (const { canonical, keywords } of ACTIVITY_RULES) {
    for (const kw of keywords) {
      if (lower.includes(kw.toLowerCase())) return canonical;
    }
  }
  return text.trim(); // keep original if no match
}

const permits = JSON.parse(fs.readFileSync('./public/data/permits.json', 'utf8'));
let normalized = 0;
let unchanged = 0;

for (const p of permits) {
  if (p.activity_type) {
    const norm = normalizeActivityType(p.activity_type);
    if (norm !== p.activity_type) normalized++;
    else unchanged++;
    p.activity_type = norm;
  }
}

fs.writeFileSync('./public/data/permits.json', JSON.stringify(permits, null, 2), 'utf8');

const stats = {};
for (const p of permits) {
  if (p.activity_type) stats[p.activity_type] = (stats[p.activity_type] || 0) + 1;
}
const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1]);
console.log(`Normalized: ${normalized}, Unchanged: ${unchanged}`);
console.log('Top activity_types:');
sorted.forEach(([k, v]) => console.log(`  ${v}x ${k}`));
console.log('Total unique:', sorted.length);
