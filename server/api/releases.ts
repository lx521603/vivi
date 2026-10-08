// server/api/releases.ts
export default defineEventHandler(async (event) => {
  // 读取目标仓库名
  const appConfig = useAppConfig()
  const repository = appConfig.repository 
  
  // 读取环境变量中的 Token
  const config = useRuntimeConfig()

  // 配置 GitHub API 请求头
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  }
  
  // 如果配置了 Token，则带上以获取更高的请求额度 (5000次/小时)
  if (config.githubToken) {
    headers['Authorization'] = `Bearer ${config.githubToken}`
  }
  
  try {
    const data = await $fetch(
      `https://api.github.com/repos/${repository}/releases`,
      { headers }
    )
    
    return data
    
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch releases from GitHub'
    })
  }
})