const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;

export const uploadToGithub = async ({
  path,
  contentBase64,
  message,
}: {
  path: string;
  contentBase64: string;
  message: string;
}) => {
    
    const owner = "TimothyBabatu13";
    const repo= "Test-out-my-script";
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    
    const res = await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message,
            content: contentBase64,
            branch: "main",
        }),
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(data));
    return data.content.download_url;
}