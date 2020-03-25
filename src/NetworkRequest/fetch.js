const fetchHouse = x =>
  fetch(
    "https://cors-anywhere.herokuapp.com/https://anapioficeandfire.com/api/houses/" +
      x
  )
    .then(response => response.json())
    .then(data => data);

const fetchLord = swornMembers =>
  fetch(swornMembers).then(response => response.json());

const randomHouse = () => Math.floor(Math.random() * 400 + 1);

const getRandomHouse = async () => {
  let x = randomHouse();
  let results = await fetchHouse(x);
  let members = {}
  if (results.swornMembers.length) {
    members = await fetchLord(results.swornMembers[0])
  }
  return ({ results, members })
};

export default getRandomHouse
