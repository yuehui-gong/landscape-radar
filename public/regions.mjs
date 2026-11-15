// Use recorded geography, never publisher headquarters or entrant eligibility.
export function regionFor(row){
  const region=String(row.region||'').trim();
  const aliases={'United States':'North America','USA':'North America','Canada':'North America','Mexico':'North America'};
  const location=String(row.location||'');
  if(/\b(United States|USA|Canada|Mexico|Texas|New York|Arizona)\b/i.test(location))return 'North America';
  if(/\b(India|Singapore|Thailand|Vietnam|Indonesia|Malaysia|Philippines|Bangladesh|Pakistan|Nepal|Sri Lanka|China|Japan|South Korea)\b/i.test(location))return 'Asia';
  if(/\b(Italy|France|Germany|Spain|Portugal|United Kingdom|Ireland|Netherlands|Belgium|Switzerland|Austria|Poland)\b/i.test(location))return 'Europe';
  if(/\b(Australia|New Zealand)\b/i.test(location))return 'Oceania';
  if(/\b(Brazil|Argentina|Chile|Colombia|Peru|Uruguay|Ecuador|Bolivia)\b/i.test(location))return 'South America';
  if(/\b(South Africa|Kenya|Nigeria|Egypt|Morocco|Ghana|Tanzania)\b/i.test(location))return 'Africa';
  if(aliases[region])return aliases[region];
  if(['North America','Europe','Asia','South America','Africa','Oceania'].includes(region))return region;
  return 'International';
}
