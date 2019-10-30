import WPAPI from 'wpapi';
import { useRef } from 'react';
export default function useWordPres(endpoint: string) {
  let wp = useRef(new WPAPI({ endpoint }));

  return {
    wp: wp.current,
  };
}
