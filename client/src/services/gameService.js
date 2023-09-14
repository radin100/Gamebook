const baseUrl = 'http://localhost:3030/game/';

const gameCheck = async (res) => {
    const game = await res.json();
    if(game.dublicate){
        throw new Error(`Game with this ${game.dublicate} already exist!`);
    }

    if(game.message){ 
        throw new Error(game.message);
    }

    return game
}

export const getAll = async () => {
    const res = await fetch(baseUrl);
    const games = await gameCheck(res);
    return games;
}

export const getAllByOwnerUsername = async (username) => {
    const res = await fetch(baseUrl + 'profile/' + username);
    const games = await gameCheck(res);
    return games;
}

export const getById = async (id) => {
    const res = await fetch(baseUrl + id);

    const game = await gameCheck(res);
    return game;
}

export const create = async (data) => {
    const res = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    const game = await gameCheck(res);
    
    return game;
}

export const update = async (id, data, userId) => {
    const res = await fetch(baseUrl + id, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ id, data, userId })
    });

    const game = await gameCheck(res);
    return game;
}

export const del = async (id, userId) => {
    const res = await fetch(baseUrl + id, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ userId })
    });

    const game = await gameCheck(res);
    return game;
}

export const doLike = async ( id, data ) => {
    await fetch(baseUrl + `${id}/like`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

export const sendComment = async (id, data) => {
    const res = await fetch(baseUrl + `${id}/comment`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const game = await gameCheck(res);
    return game;
}