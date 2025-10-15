import type { ActionInputs } from './types';

export declare function run(): Promise<void>;
declare function extractChangelogForVersion(changelogPath: string, version: string): string;
declare function updateHomebrewFormula(inputs: ActionInputs,
  assets: { name: string, browser_download_url: string }[],
  octokit: ReturnType<typeof github.getOctokit>,): Promise<void>;

export * from './types'