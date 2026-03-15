const XLSX = require('xlsx');
const fs = require('fs');
const wb = XLSX.readFile(process.env.TEMP + '\\permits.xlsx');

const results = [];

// Sheet 0: გარემოსდაცვითი გადაწყვეტილება
// cols: 0=company,1=project,3=ecoDate,5=permitDate,7=decisionDate,13=address,14=municipality,15=region,18=attachment,19=activity,25=website
{
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
  const sheetName = wb.SheetNames[0];
  for (let i = 2; i < rows.length; i++) {
    const r = rows[i];
    if (!r || !r[0]) continue;
    const company = String(r[0]||'').trim();
    const project = String(r[1]||'').trim();
    const ecoDate = String(r[3]||'');
    const permitDate = String(r[5]||'');
    const decisionDate = String(r[7]||'');
    const address = String(r[13]||'').trim();
    const municipality = String(r[14]||'').trim();
    const region = String(r[15]||'').trim();
    const attachment = r[18] != null ? String(r[18]) : '';
    const activity = String(r[19]||'').trim();
    const website = String(r[25]||'').trim();
    const getYear = s => { const m = String(s||'').match(/\b(19|20)\d{2}\b/); return m?m[0]:''; };
    const year = getYear(decisionDate)||getYear(permitDate)||getYear(ecoDate);
    if (!company) continue;
    results.push({company,project,permit_type:sheetName,year,municipality,region,address,activity,attachment,website});
  }
}

// Sheet 1: სკოპინგი
// cols: 0=company,1=project,4=date(bjaneba),8=address,9=municipality,10=region,11=attachment,12=activity,13=detail,15=date(daskvna),19=website
{
  const ws = wb.Sheets[wb.SheetNames[1]];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
  const sheetName = wb.SheetNames[1];
  for (let i = 2; i < rows.length; i++) {
    const r = rows[i];
    if (!r || !r[0]) continue;
    const company = String(r[0]||'').trim();
    const project = String(r[1]||'').trim();
    const dateStr = String(r[4]||'');
    const address = String(r[8]||'').trim();
    const municipality = String(r[9]||'').trim();
    const region = String(r[10]||'').trim();
    const attachment = r[11] != null ? String(r[11]) : '';
    const activity = String(r[12]||'').trim();
    const website = String(r[19]||'').trim();
    const getYear = s => { const m = String(s||'').match(/\b(19|20)\d{2}\b/); return m?m[0]:''; };
    const year = getYear(dateStr);
    if (!company) continue;
    results.push({company,project,permit_type:sheetName,year,municipality,region,address,activity,attachment,website});
  }
}

// Sheet 2: სკრინინგი
// cols: 0=company,1=project,3=date,7=address,8=region,9=municipality,10=attachment,11=activity,12=detail,15=website
{
  const ws = wb.Sheets[wb.SheetNames[2]];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
  const sheetName = wb.SheetNames[2];
  for (let i = 2; i < rows.length; i++) {
    const r = rows[i];
    if (!r || !r[0]) continue;
    const company = String(r[0]||'').trim();
    const project = String(r[1]||'').trim();
    const dateStr = String(r[3]||'');
    const address = String(r[7]||'').trim();
    const region = String(r[8]||'').trim();
    const municipality = String(r[9]||'').trim();
    const attachment = r[10] != null ? String(r[10]) : '';
    const activity = String(r[11]||'').trim();
    const website = String(r[15]||'').trim();
    const getYear = s => { const m = String(s||'').match(/\b(19|20)\d{2}\b/); return m?m[0]:''; };
    const year = getYear(dateStr);
    if (!company) continue;
    results.push({company,project,permit_type:sheetName,year,municipality,region,address,activity,attachment,website});
  }
}

// Sheet 3: გაუქმება - same structure as გარემოსდაცვითი
{
  const ws = wb.Sheets[wb.SheetNames[3]];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
  const sheetName = wb.SheetNames[3];
  for (let i = 2; i < rows.length; i++) {
    const r = rows[i];
    if (!r || !r[0]) continue;
    const company = String(r[0]||'').trim();
    const project = String(r[1]||'').trim();
    const ecoDate = String(r[3]||'');
    const permitDate = String(r[5]||'');
    const decisionDate = String(r[7]||'');
    const address = String(r[13]||'').trim();
    const municipality = String(r[14]||'').trim();
    const region = String(r[15]||'').trim();
    const attachment = r[18] != null ? String(r[18]) : '';
    const activity = String(r[19]||'').trim();
    const website = String(r[25]||'').trim();
    const getYear = s => { const m = String(s||'').match(/\b(19|20)\d{2}\b/); return m?m[0]:''; };
    const year = getYear(decisionDate)||getYear(permitDate)||getYear(ecoDate);
    if (!company) continue;
    results.push({company,project,permit_type:sheetName,year,municipality,region,address,activity,attachment,website});
  }
}

// Sheet 6: გზშ-გან გათავისუფლება - same structure as სკრინინგი probably
{
  const ws = wb.Sheets[wb.SheetNames[6]];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
  const sheetName = wb.SheetNames[6];
  console.log('გზშ headers:', JSON.stringify(rows[1]));
  console.log('გზშ row3:', JSON.stringify(rows[2]));
  for (let i = 2; i < rows.length; i++) {
    const r = rows[i];
    if (!r || !r[0]) continue;
    const company = String(r[0]||'').trim();
    const project = String(r[1]||'').trim();
    const dateStr = String(r[3]||'');
    const address = String(r[7]||'').trim();
    const region = String(r[8]||'').trim();
    const municipality = String(r[9]||'').trim();
    const attachment = r[10] != null ? String(r[10]) : '';
    const activity = String(r[11]||'').trim();
    const website = String(r[14]||'').trim();
    const getYear = s => { const m = String(s||'').match(/\b(19|20)\d{2}\b/); return m?m[0]:''; };
    const year = getYear(dateStr);
    if (!company) continue;
    results.push({company,project,permit_type:sheetName,year,municipality,region,address,activity,attachment,website});
  }
}

const outPath = process.env.USERPROFILE + '\\Desktop\\greencomply\\public\\data\\permits.json';
fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');
console.log('Total:', results.length);
const bySheet = {};
results.forEach(r => { bySheet[r.permit_type] = (bySheet[r.permit_type]||0)+1; });
console.log(JSON.stringify(bySheet, null, 2));
console.log('Scoping sample:', JSON.stringify(results.find(r=>r.permit_type.includes('\u10E1\u10D9\u10DD\u10DE')), null, 2));
