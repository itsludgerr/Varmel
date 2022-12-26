const fetch = require("node-fetch");
const fs = require('node:fs/promises');
const path = require("path");
const nodeHtmlToImage = require('node-html-to-image');

const mainFolder = path.resolve(path.dirname(__filename), "../");
const cachePath = `${mainFolder}\\cache\\`;

const base_url = "https://api.vrmasterleague.com";

async function fetchJSON (url) {
    let response = await fetch(url);
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
    } else {
        var res = response.text();
        return res;
    }
}

async function deleteJSON(teamID) {
    const path = `${cachePath}${teamID}.json`;
    const path2 = `${cachePath}${teamID}-players.json`;
    try {
        fs.unlink(path);
        fs.unlink(path2);
    } catch (error) {
        console.log(err);
    }
}

async function getTeamID(teamName) {
    try {
        let params = new URLSearchParams({ name: teamName });
        let data = await fetchJSON(`${base_url}/EchoArena/Teams/Search?${params}`);
        return data[0].id;
    } catch (error) {
        console.log(error);
    }
}

async function getTeamPlayers(teamID){
    try {
        let info = await fetchJSON(`${base_url}/Teams/${teamID}/Players/`);
        //write JSON string to a file
        const path = `${cachePath}${teamID}-players.json`;
        try {
            await fs.writeFile(`${path}`, JSON.stringify(info));
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
}

async function getTeamInfo(teamID) {
    try {
        let info = await fetchJSON(`${base_url}/Teams/${teamID}`);
        const path = `${cachePath}${teamID}.json`;
        //write JSON string to a file
        try {
            await fs.writeFile(`${path}`, JSON.stringify(info));
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
}

async function getPlayer(teamID, number){
    try {
        const path = `${cachePath}${teamID}-players.json`;
        const info = require(path);
        return info.players[number].playerName;
    } catch (error) {
        return `.....`
    }
}

async function getTeamName (teamID) {
    try {
        const path = `${cachePath}${teamID}.json`;
        const info = require(path);
        const teamName = info.team.teamName;
        return teamName;
    } catch (error) {
        console.log(error);
    }
}

async function getTeamLogo (teamID) {
    try {
        const path = `${cachePath}${teamID}.json`;
        const info = require(path);
        return `http://vrmasterleague.com${info.team.teamLogo}`;
    } catch (error) {
        console.log(error);
    }
}

async function getTeamDivision(teamID) {
    try {
        const path = `${cachePath}${teamID}.json`;
        const info = require(path);
        const division = info.team.divisionName;
        return division;
    } catch (error) {
        console.log(error);
    }
}

async function getTeamMMR(teamID) {
    try {
        const path = `${cachePath}${teamID}.json`;
        const info = require(path);
        const mmr = info.team.mmr;
    return mmr;
    } catch (error) {
        console.log(error);
    }
}

async function getTeamDivisionLogo(teamID) {
    try {
        const path = `${cachePath}${teamID}.json`;
        const info = require(path);
        const divisionLogo = `http://vrmasterleague.com${info.team.divisionLogo}`;
        return divisionLogo;
    } catch (error) {
        console.log(error);
    }
}

async function getTeamRegion(teamID) {
    try {
        const path = `${cachePath}${teamID}.json`;
        const info = require(path);
        let region = info.team.regionName;
        switch (region) {
            case 'America East':
                region = "NA/E";
                break;
            case 'America West':
                region = "NA/W";
                break;
            case 'Europe':
                region = "EU";
                break;
            case 'Oceania/Asia':
                region = "OA";
                break;
            }
        return region;
    } catch (error) {
        console.log(error);
    }
}

async function getTeamW(teamID) {
    try {
        const path = `${cachePath}${teamID}.json`;
        const info = require(path);
        const teamW = info.team.w;
        return `${teamW}`
    } catch (error) {
        console.log(error);
    }
}

async function getTeamL(teamID) {
    try {
        const path = `${cachePath}${teamID}.json`;
        const info = require(path);
        const teamL = info.team.l;
        return `${teamL}`
    } catch (error) {
        console.log(error);
    }
}

async function getTeamRank(teamID) {
    try {
        const path = `${cachePath}${teamID}.json`;
        const info = require(path);
        const rank = info.team.rank;
        return rank;
    } catch (error) {
        console.log(error);
    }
}

async function getTeamPts(teamID) {
    try {
        const path = `${cachePath}${teamID}.json`;
        const info = require(path);
        const pts = info.team.pts;
        return pts;
    } catch (error) {
        console.log(error);
    }
}

async function getProfileImage(teamID){
    var teamName = await getTeamName(teamID);
    var player0 = await getPlayer(teamID, 0);
    var player1 = await getPlayer(teamID, 1);
    var player2 = await getPlayer(teamID, 2);
    var player3 = await getPlayer(teamID, 3);
    var player4 = await getPlayer(teamID, 4);
    var player5 = await getPlayer(teamID, 5);
    var teamLogo = await getTeamLogo(teamID);
    var division = await getTeamDivision(teamID);
    var divisionLogo = await getTeamDivisionLogo(teamID);
    var region = await getTeamRegion(teamID);
    var mmr = await getTeamMMR(teamID);
    var rank = await getTeamRank(teamID);
    var teamW = await getTeamW(teamID);
    var teamL = await getTeamL(teamID);
    var teamPts = await getTeamPts(teamID);
    try {
        await fs.readFile('./teamInfo.handlebars').then((data) => {
            html = data.toString();
        })
        let image = await nodeHtmlToImage({
            html: html,
            content: {
              logoSource: teamLogo,
              teamName: teamName,
              teamW: teamW,
              teamL: teamL,
              divisionLogo: divisionLogo,
              division: division,
              rank: rank,
              region: region,
              mmr: mmr,
              pts: teamPts,
              player0: player0,
              player1: player1,
              player2: player2,
              player3: player3,
              player4: player4,
              player5: player5
            },
            puppeteerArgs: { args: ["--no-sandbox"] }
        })
        console.log(`Gave team stats of ${teamName}`)
        return image;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getProfileImage, getTeamPts, getPlayer, getTeamPlayers, deleteJSON, getTeamInfo, getTeamMMR, getTeamID, getTeamDivision, getTeamDivisionLogo, getTeamLogo, getTeamRank, getTeamRegion, getTeamW, getTeamL, getTeamName }