import { Prompt } from '@/types/prompt';

export function exportPromptsToJSON(prompts: Prompt[], collectionName: string) {
  const dataStr = JSON.stringify(prompts, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${collectionName}-prompts.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportPromptsToCSV(prompts: Prompt[], collectionName: string) {
  const headers = ['Title', 'Description', 'Prompt Text', 'AI Systems', 'Categories', 'Rating', 'Views'];
  const rows = prompts.map(p => [
    `"${p.title}"`,
    `"${p.description}"`,
    `"${p.promptText.replace(/"/g, '""').substring(0, 100)}..."`,
    `"${p.aiSystem.join(', ')}"`,
    `"${p.category.join(', ')}"`,
    p.rating?.toFixed(1) || '0',
    p.views || '0',
  ]);

  const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${collectionName}-prompts.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
