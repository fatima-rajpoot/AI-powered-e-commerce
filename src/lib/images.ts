const params = "auto=format&fit=crop&q=80";

export function img(id: string, w = 800) {
  return `https://images.unsplash.com/photo-${id}?${params}&w=${w}`;
}

export const images = {
  hero: img("1441986300917-64674bd600d8", 1920),
  women: img("1490481651871-ab68de25d43d", 1920),
  men: img("1617137968427-85924c800a22", 1920),
  heels: img("1543163521-1bf539c55dd2"),
  makeup: img("1522335789203-aabd1fc54bc9"),
  dress: img("1595777457583-95e059d581b8"),
  watches: img("1523275335684-37898b6baf30"),
  shoes: img("1549298916-b41d501d3772"),
  wallet: img("1553062407-98eeb64c6a62"),
  heel2: img("1515347619252-60a4bf4fff4f"),
  heel3: img("1560769629-975ec94e6a86"),
  heel4: img("1460353581641-37baddab0fa2"),
  makeup2: img("1586495777744-4413f21062fa"),
  makeup3: img("1512496015851-a90fb38ba796"),
  makeup4: img("1596462502278-27bfdc403348"),
  dress2: img("1594633312681-425c7b97ccd1"),
  dress3: img("1509631179647-0177331693ae"),
  dress4: img("1434389677669-e08b4cac3105"),
  watch2: img("1523275335684-37898b6baf30"),
  watch3: img("1543163521-1bf539c55dd2"),
  watch4: img("1515347619252-60a4bf4fff4f"),
  shoe2: img("1606107557195-0e29a4b5b4aa"),
  shoe3: img("1549298916-b41d501d3772"),
  shoe4: img("1606107557195-0e29a4b5b4aa"),
  wallet2: img("1553062407-98eeb64c6a62"),
  wallet3: img("1543163521-1bf539c55dd2"),
  wallet4: img("1515347619252-60a4bf4fff4f"),
} as const;
