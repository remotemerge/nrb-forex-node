import { apiUrl } from './helper/config';
import { apiError } from './helper/message';
import { StandardRate } from './types';

const liveRate = async (iso3 = ''): Promise<StandardRate | StandardRate[]> => {
  const res = await fetch(`${apiUrl}/app-rate`);
  if (!res.ok) {
    throw new Error(apiError);
  }
  // Load the data from the response
  const data = <StandardRate[]>await res.json();

  // Filter the data based on the iso3 parameter
  if (iso3) {
    const [match] = data.filter(
      (rate) => rate.iso3.toUpperCase() === iso3.toUpperCase(),
    );
    return match;
  }
  return data;
};

export { liveRate };
