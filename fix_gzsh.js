const XLSX = require('xlsx');
const fs = require('fs');
const wb = XLSX.readFile(process.env.TEMP + '\\permits.xlsx');
const results = JSON.parse(fs.readFileSync(process.env.USERPROFILE + '\\Desktop\\greencomply\\public\\data\\permits.json','utf8'));

// Remove old გზშ entries and re-parse correctly
const filtered = results.filter(r => !r.permit_type.includes('\u10D2\u10D6\u10E8'));

// Sheet 6: გზშ-გან გათავისუფლება
// cols: 0=company,1=project,7=ecoDate,12=address,13=municipality,14=region,16=attachment,17=activity
const ws = wb.Sheets[wb.SheetNames[6]];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
const sheetName = wb.SheetNames[6];
for (let i = 2; i < rows.length; i++) {
  const r = rows[i];
  if (!r || !r[0]) continue;
  const company = String(r[0]||'').trim();
  const project = String(r[1]||'').trim();
  const ecoDate = String(r[7]||'');
  const address = String(r[12]||'').trim();
  const municipality = String(r[13]||'').trim();
  const region = String(r[14]||'').trim();
  const attachment = r[16] != null ? String(r[16]) : '';
  const activity = String(r[17]||'').trim();
  const getYear = s => { const m = String(s||'').match(/\b(19|20)\d{2}\b/); return m?m[0]:''; };
  const year = getYear(ecoDate);
  if (!company) continue;
  filtered.push({company,project,permit_type:sheetName,year,municipality,region,address,activity,attachment,website:''});
}

const outPath = process.env.USERPROFILE + '\\Desktop\\greencomply\\public\\data\\permits.json';
fs.writeFileSync(outPath, JSON.stringify(filtered, null, 2), 'utf8');
console.log('Total:', filtered.length);
console.log('გზშ sample:', JSON.stringify(filtered.find(r=>r.permit_type.includes('\u10D2\u10D6\u10E8')), null, 2));
