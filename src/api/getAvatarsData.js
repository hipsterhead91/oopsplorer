import { Octokit } from "@octokit/rest";

// Octokit - официальный клиент для GitHub API; среди прочего позволяет "скачать" тот или 
// иной репозиторий в виде объекта. Документация: https://octokit.github.io/rest.js/v19

const octokit = new Octokit();

async function getAvatarsData(chain) {
  const repo = await octokit.repos.getContent({
    owner: 'cosmostation',
    repo: 'cosmostation_token_resource',
    path: `moniker/${chain.cosmostation}`
  });
  return repo.data;
}

export default getAvatarsData;