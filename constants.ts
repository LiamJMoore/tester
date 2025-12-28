import { NavItem, SectionId, TokenStat } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Start Hunt', id: SectionId.HERO },
  { label: 'Harpoon Game', id: SectionId.GAME },
  { label: 'The Log', id: SectionId.LORE },
  { label: 'Loot', id: SectionId.TOKENOMICS },
  { label: 'Jeet Radar', id: SectionId.RADAR },
  { label: 'Ask Cap', id: SectionId.ORACLE },
];

export const TOKEN_STATS: TokenStat[] = [
  { label: 'Total Supply', value: '1B', description: '1 Billion Harpoons forged in iron.' },
  { label: 'Tax', value: '0/0', description: 'No taxes. Only the hunt matters.' },
  { label: 'Liquidity', value: 'LOCKED', description: 'Anchored to the sea floor forever.' },
];

export const MANIFESTO_PARAGRAPHS = [
  `My name is Captain Ahab, and I bear the scars of the great bear market of '22. They took my leg, they took my portfolio, but they could not take my vengeance. I hunt a beast not made of flesh and blood, but of pure green candles and market cap. I hunt Moby Dick—the White Whale of the Blockchain.`,
  
  `This beast has evaded every trader, wrecked every leverage shorter, and liquidated the mightiest hedge funds. It is the One Billion Dollar Market Cap. The "God Candle" that pierces the heavens. Men say it's a myth, a hallucination of hopium-addicted degens. But I have seen it! I have seen the charts glimmer white in the moonlight!`,
  
  `$AHAB is not just a token; it is a whaling ship. We are the crew of the Pequod, sworn to chase this white devil round the Cape of Good Hope, and round the Horn, and round the Norway Maelstrom, and round perdition's flames before we give him up. Grab a harpoon. The White Whale awaits.`
];
