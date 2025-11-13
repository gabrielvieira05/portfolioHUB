# Política de Segurança

Levamos a segurança deste projeto a sério. Este documento descreve as políticas de segurança aplicadas ao repositório **PortfolioHUB** e como reportar vulnerabilidades encontradas.

## Versões Suportadas

Atualmente, fornecemos atualizações de segurança apenas para a versão mais recente implantada na branch principal (`main`).

| Versão | Suportada          |
| ------- | ------------------ |
| main    | :white_check_mark: |
| outras  | :x:                |

## Como Reportar uma Vulnerabilidade

Se você descobrir uma vulnerabilidade de segurança neste projeto, por favor, **NÃO abra uma issue pública**. Isso permite que a falha seja corrigida antes de se tornar conhecida publicamente.

Por favor, envie um relatório detalhado por e-mail para:
**[gabriel.vieiras@sempreceub.com]**

Inclua as seguintes informações:
* Tipo da vulnerabilidade;
* Passos para reproduzir o problema;
* Possível impacto.

Tentaremos responder em até 48 horas.

## Medidas de Segurança Adotadas

Para garantir a integridade e segurança do código hospedado, este projeto segue as seguintes diretrizes:

1.  **Proteção de Branch:** A branch `main` é protegida. Nenhum código pode ser enviado diretamente (push) sem passar por um processo de revisão (Pull Request).
2.  **Dados Sensíveis:** Nenhuma chave de API, token de acesso, senha ou arquivo de configuração sensível (como `.env`) é versionado neste repositório. Utilizamos `.gitignore` rigorosamente.
3.  **Dependabot:** Monitoramos dependências externas em busca de vulnerabilidades conhecidas através dos alertas de segurança do GitHub.
4.  **Revisão de Código:** Todas as alterações passam por revisão antes da implantação em produção (GitHub Pages).

---
*Este documento de política de segurança foi elaborado com apoio de Inteligência Artificial (Google Gemini) seguindo as melhores práticas de DevSecOps.*
