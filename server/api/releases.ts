// server/api/releases.ts
export default defineEventHandler(async (event) => {
  // 1. 读取你在 app/app.config.ts 里配置好的仓库名（不再需要重复写！）
  const appConfig = useAppConfig()
  const repository = appConfig.repository 
  
  // 2. 读取你在 .env 和 nuxt.config.ts 里配置好的 Token
  const config = useRuntimeConfig()
  
  console.log('🔍 [Debug] 目标仓库:', repository)
  console.log('🔑 [Debug] Token 状态:', config.githubToken ? `已加载 (长度: ${config.githubToken.length})` : '未找到 (请检查 .env)')

  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    }
    
    // 3. 如果有 Token，就带上（享受 5000 次/小时的额度）
    if (config.githubToken) {
      headers['Authorization'] = `Bearer ${config.githubToken}`
    }
    
    console.log('🌐 [Debug] 正在请求 GitHub API...')
    const data = await $fetch(
      `https://api.github.com/repos/${repository}/releases`,
      { headers }
    )
    
    console.log('✅ [Debug] GitHub 返回数据条数:', Array.isArray(data) ? data.length : 0)
    return data
    
  } catch (error: any) {
    console.error('❌ [Debug] GitHub API 请求失败:', error.message)
    
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch releases from GitHub'
    })
  }
})