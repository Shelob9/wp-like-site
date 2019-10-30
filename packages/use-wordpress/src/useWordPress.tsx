import WPAPI from 'wpapi';
export default function useWordPres(endpoint: string) {
  const initSite = async () => {
    const site = await WPAPI.discover(url);
    return site;
  };

  const wp = new WPAPI({ endpoint });

  return {
    wp,
  };
}
