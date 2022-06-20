import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const {loading, error, request} = useHttp()

  const _apiBase = 'https://gateway.marvel.com:443/v1/public';
  const _apiKey = 'apikey=356f0e241fac6769ceef934b2940211b';
  const _baseOffset = 300

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`,
    );
    return res.data.results.map(_transformChar);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
    return _transformChar(res.data.results[0]);
  };

  const _transformChar = (char) => {
    return {
      id: char.id,
      name: char.name,
      description:  char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    };
  };
  return {loading, error, getAllCharacters, getCharacter}
}

export default useMarvelService;
