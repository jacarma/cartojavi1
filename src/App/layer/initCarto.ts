import { setDefaultCredentials } from '@deck.gl/carto/typed';

export function initCarto() {
  setDefaultCredentials({
    accessToken:
      'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfbGU5emg0MGUiLCJqdGkiOiIzNDc0ZmM5NiJ9.PBktjbtXa9po2aN_NWWyYGL5HZkAJQiKL93j_bqZXo8',
  });
}
