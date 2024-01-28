import { of, from, mergeMap, fromEvent } from 'rxjs';

// stage 1
const url = 'https://api.github.com/users';

const request$ = of(url);

// fetch(url).then(response => response.json()).then(result => console.log(result));

// request$.subscribe(async (url) => {
// 	const result = await fetch(url).then((response) => response.json());
// 	console.log(result);
// });

// const response$ = request$.pipe(
// 	mergeMap((requestUrl) =>
// 		from(fetch(requestUrl).then((response) => response.json())),
// 	),
// );

const response$ = request$.pipe(
	mergeMap((url) => fetch(url)),
	mergeMap((response) => response.json())
);

response$.subscribe((result) => console.log(result));

function getRandomUser(usersList) {
	return usersList[Math.floor(Math.random() * usersList.length)];
}

function getRandomOffset() {
	return Math.floor(Math.random() * 500);
}

function renderSuggestion(suggestedUser, selector) {
	const suggestionEl = document.querySelector(selector);

	if (suggestedUser === null) {
		suggestionEl.style.visibility = 'hidden';
	} else {
		suggestionEl.style.visibility = 'visible';

		const usernameEl = suggestionEl.querySelector('.username');
		usernameEl.href = suggestedUser.html_url;
		usernameEl.textContent = suggestedUser.login;

		const imgEl = suggestionEl.querySelector('img');
		imgEl.src = suggestedUser.avatar_url;
	}
}
