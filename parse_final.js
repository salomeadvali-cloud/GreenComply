const XLSX = require('xlsx');
const fs = require('fs');
const wb = XLSX.readFile(process.env.TEMP + '\\permits.xlsx');

const results = [];

// Sheet 0: გარემოსდაცვითი გადაწყვეტილება
{
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
  const sheetName = wb.SheetNames[0];
  for (let i = 2; i < rows.length; i++) {
    const r = rows[i]; if (!r||!r[0]) continue;
    const getYear = s => { const m = String(s||'').match(/\b(19|20)\d{2}\b/); return m?m[0]:''; };
    results.push({
      company: String(r[0]||'').trim(), project: String(r[1]||'').trim(),
      permit_type: sheetName,
      year: getYear(r[7])||getYear(r[5])||getYear(r[3]),
      municipality: String(r[14]||'').trim(), region: String(r[15]||'').trim(),
      address: String(r[13]||'').trim(), activity: String(r[19]||'').trim(),
      activity_type: String(r[21]||'').trim(),
      attachment: r[18]!=null?String(r[18]):'', website: String(r[25]||'').trim(),
      eia_required: ''
    });
  }
}

// Sheet 1: სკოპინგი
{
  const ws = wb.Sheets[wb.SheetNames[1]];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
  const sheetName = wb.SheetNames[1];
  for (let i = 2; i < rows.length; i++) {
    const r = rows[i]; if (!r||!r[0]) continue;
    const getYear = s => { const m = String(s||'').match(/\b(19|20)\d{2}\b/); return m?m[0]:''; };
    results.push({
      company: String(r[0]||'').trim(), project: String(r[1]||'').trim(),
      permit_type: sheetName, year: getYear(r[4]),
      municipality: String(r[9]||'').trim(), region: String(r[10]||'').trim(),
      address: String(r[8]||'').trim(), activity: String(r[12]||'').trim(),
      activity_type: String(r[13]||'').trim(),
      attachment: r[11]!=null?String(r[11]):'', website: String(r[19]||'').trim(),
      eia_required: ''
    });
  }
}

// Sheet 2: სკრინინგი — col 4 = სკრინინგის გადაწყვეტილება
{
  const ws = wb.Sheets[wb.SheetNames[2]];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
  const sheetName = wb.SheetNames[2];
  for (let i = 2; i < rows.length; i++) {
    const r = rows[i]; if (!r||!r[0]) continue;
    const getYear = s => { const m = String(s||'').match(/\b(19|20)\d{2}\b/); return m?m[0]:''; };
    const eiaRaw = String(r[4]||'').trim();
    const eia_required = eiaRaw.includes('\u10D0\u10E0 \u10D4\u10E5\u10D5') ? '\u10D0\u10E0 \u10D4\u10E5\u10D5\u10D4\u10DB\u10D3\u10D4\u10D1\u10D0\u10E0\u10D4\u10D1\u10D0' :
                         eiaRaw.includes('\u10D4\u10E5\u10D5') ? '\u10D4\u10E5\u10D5\u10D4\u10DB\u10D3\u10D4\u10D1\u10D0\u10E0\u10D4\u10D1\u10D0' : eiaRaw;
    results.push({
      company: String(r[0]||'').trim(), project: String(r[1]||'').trim(),
      permit_type: sheetName, year: getYear(r[3]),
      municipality: String(r[9]||'').trim(), region: String(r[8]||'').trim(),
      address: String(r[7]||'').trim(), activity: String(r[11]||'').trim(),
      activity_type: String(r[12]||'').trim(),
      attachment: r[10]!=null?String(r[10]):'', website: String(r[15]||'').trim(),
      eia_required
    });
  }
}

// Sheet 3: გაუქმება
{
  const ws = wb.Sheets[wb.SheetNames[3]];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
  const sheetName = wb.SheetNames[3];
  for (let i = 2; i < rows.length; i++) {
    const r = rows[i]; if (!r||!r[0]) continue;
    const getYear = s => { const m = String(s||'').match(/\b(19|20)\d{2}\b/); return m?m[0]:''; };
    results.push({
      company: String(r[0]||'').trim(), project: String(r[1]||'').trim(),
      permit_type: sheetName,
      year: getYear(r[7])||getYear(r[5])||getYear(r[3]),
      municipality: String(r[14]||'').trim(), region: String(r[15]||'').trim(),
      address: String(r[13]||'').trim(), activity: String(r[19]||'').trim(),
      activity_type: String(r[21]||'').trim(),
      attachment: r[18]!=null?String(r[18]):'', website: String(r[25]||'').trim(),
      eia_required: ''
    });
  }
}

// Sheet 6: გზშ-გან გათავისუფლება
{
  const ws = wb.Sheets[wb.SheetNames[6]];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
  const sheetName = wb.SheetNames[6];
  for (let i = 2; i < rows.length; i++) {
    const r = rows[i]; if (!r||!r[0]) continue;
    const getYear = s => { const m = String(s||'').match(/\b(19|20)\d{2}\b/); return m?m[0]:''; };
    results.push({
      company: String(r[0]||'').trim(), project: String(r[1]||'').trim(),
      permit_type: sheetName, year: getYear(r[7]),
      municipality: String(r[13]||'').trim(), region: String(r[14]||'').trim(),
      address: String(r[12]||'').trim(), activity: String(r[17]||'').trim(),
      attachment: r[16]!=null?String(r[16]):'', website: '',
      eia_required: ''
    });
  }
}

const outPath = process.env.USERPROFILE + '\\Desktop\\greencomply\\public\\data\\permits.json';
fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8');
console.log('Total:', results.length);
// Show screening samples
const screening = results.filter(r=>r.permit_type.includes('\u10E1\u10D9\u10E0\u10D8\u10DC\u10D8\u10DC\u10D2'));
console.log('Screening with EIA:');
console.log(JSON.stringify(screening[0], null, 2));
console.log(JSON.stringify(screening[2], null, 2));
