import assert from 'node:assert/strict'
import test from 'node:test'

import { extractGitHubRepoSlug } from './repoSlug.ts'

test('keeps owner/repo input as-is', () => {
  assert.equal(extractGitHubRepoSlug('Gitlawb/rise-cli'), 'Gitlawb/rise-cli')
})

test('extracts slug from https GitHub URLs', () => {
  assert.equal(
    extractGitHubRepoSlug('https://github.com/Gitlawb/rise-cli'),
    'Gitlawb/rise-cli',
  )
  assert.equal(
    extractGitHubRepoSlug('https://www.github.com/Gitlawb/rise-cli.git'),
    'Gitlawb/rise-cli',
  )
})

test('extracts slug from ssh GitHub URLs', () => {
  assert.equal(
    extractGitHubRepoSlug('git@github.com:Gitlawb/rise-cli.git'),
    'Gitlawb/rise-cli',
  )
  assert.equal(
    extractGitHubRepoSlug('ssh://git@github.com/Gitlawb/rise-cli'),
    'Gitlawb/rise-cli',
  )
})

test('rejects malformed or non-GitHub URLs', () => {
  assert.equal(extractGitHubRepoSlug('https://gitlab.com/Gitlawb/rise-cli'), null)
  assert.equal(extractGitHubRepoSlug('https://github.com/Gitlawb'), null)
  assert.equal(extractGitHubRepoSlug('not actually github.com/Gitlawb/rise-cli'), null)
  assert.equal(
    extractGitHubRepoSlug('https://evil.example/?next=github.com/Gitlawb/rise-cli'),
    null,
  )
  assert.equal(
    extractGitHubRepoSlug('https://github.com.evil.example/Gitlawb/rise-cli'),
    null,
  )
  assert.equal(
    extractGitHubRepoSlug('https://example.com/github.com/Gitlawb/rise-cli'),
    null,
  )
})
