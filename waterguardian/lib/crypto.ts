// Função simples para criptografar senhas
// Em um ambiente real, usaríamos bcrypt ou argon2
export async function hash(password: string): Promise<string> {
  // Esta é uma implementação simplificada para demonstração
  // Em produção, use uma biblioteca de criptografia adequada
  const encoder = new TextEncoder()
  const data = encoder.encode(password)

  // Usar SHA-256 para criar um hash da senha
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)

  // Converter o buffer para string hexadecimal
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

  return hashHex
}

// Função para comparar senha com hash
export async function compare(password: string, hashedPassword: string): Promise<boolean> {
  const passwordHash = await hash(password)
  return passwordHash === hashedPassword
}
