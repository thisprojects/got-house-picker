import React from "react";

const HouseInfo = ({ results, members, form }) => {
  if (results && results.name) {
    return (
      <div>
        <div className="nameBox">
          <h1>
            { form } of { results.name }
          </h1>
        </div>
        <div className="resultsTable">
          <table>
            <tbody>
              <ConditionalTableData
                label={ "Coat of Arms" }
                truthy={ results.coatOfArms }
                falsy={ "none" }
              />
              <tr>
                <td>Region: </td>
                <td>{results.region}</td>
              </tr>
              <tr>
                <td>Titles: </td>
                <td>
                  <MapTitles titles={ results.titles } />
                </td>
              </tr>
              <ConditionalTableData
                label={ "Current Lord" }
                truthy={ members.name }
                falsy={ "none" }
              />
              <ConditionalTableData
                label={"Words"}
                truthy={results.words}
                falsy={"none"}
              />
              <ConditionalTableData
                label={"Founded"}
                truthy={results.founded}
                falsy={"Unknown"}
              />
              <ConditionalTableData
                label={"Died Out"}
                truthy={results.diedOut}
                falsy={"Still Active"}
              />
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const ConditionalTableData = ({ truthy, falsy, label }) => (
  <tr>
    <td>{label}:</td>
    { (truthy && <td>{ truthy }</td>) || <td>{falsy}</td> }
  </tr>
);

const MapTitles = ({ titles }) => {
  console.log(titles);
  return (
    (titles[0] && ( // if a house has no titles an array containing 1 empty string is returned
      <div>
        <ul>
          {titles.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>
    )) || <p>None</p>
  );
};

export default HouseInfo;
