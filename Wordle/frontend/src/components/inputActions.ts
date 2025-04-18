async function makeGuess(gameId: string, guess: string) {
  const response = await fetch(`/api/games/${gameId}/guesses`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ guess: guess }),
  });

  if (!response.ok) {
    console.error(
      "Failed to post guess:",
      response.status,
      "\n",
      response.statusText
    );
  }

  const payload = await response.json();

  return payload;
}

async function getEvaluation(gameId: string, index: number) {
  const response = await fetch(`/api/games/${gameId}/evaluation`);

  if (!response.ok) {
    console.error(
      "Failed to retrieve data:",
      response.status,
      "\n",
      response.statusText
    );
  }

  const payload = await response.json();

  return payload.evaluation[index];
}

export { makeGuess, getEvaluation };
