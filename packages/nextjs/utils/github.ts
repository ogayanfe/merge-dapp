export const parseGithubUrl = (url: string) => {
  try {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)(\/pull\/(\d+))?/);
    if (!match) return null;
    return {
      owner: match[1],
      repo: match[2],
      number: match[4],
      fullRepo: `${match[1]}/${match[2]}`,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const validatePrAgainstRepo = (prUrl: string, repoUrl: string) => {
  const pr = parseGithubUrl(prUrl);
  const repo = parseGithubUrl(repoUrl);

  if (!pr || !repo) return false;

  return pr.owner.toLowerCase() === repo.owner.toLowerCase() && pr.repo.toLowerCase() === repo.repo.toLowerCase();
};
