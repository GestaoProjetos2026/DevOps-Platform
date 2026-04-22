import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import product3 from '../assets/product3.png';
import product4 from '../assets/product4.png';

export const products = [
  {
    id: 'crm-leads',
    image: product1,
    icon: '🎯',
    title: '[SALE] - CRM & Leads',
    description: 'Transforme contatos em contratos com nosso pipeline de vendas inteligente e rastreamento de ponta a ponta.',
    fullDescription: 'Potencialize sua equipe comercial com um CRM focado em conversão. Gerencie todo o ciclo de vida do cliente, desde a captação do lead até o fechamento do negócio. Inclui pontuação de leads, automação de e-mails de prospecção, histórico completo de interações e painéis de conversão em tempo real.',
    tags: ['Vendas', 'Conversão', 'Pipeline'],
    price: '89'
  },
  {
    id: 'service-desk',
    image: product2,
    icon: '🎧',
    title: '[SERV] - Service Desk',
    description: 'Eleve a experiência do seu cliente com suporte ágil, gestão de SLAs e resolução de chamados eficiente.',
    fullDescription: 'Centralize o atendimento ao cliente e a resolução de problemas em uma plataforma robusta. Classifique, priorize e atribua tickets automaticamente para a equipe certa. Garanta o cumprimento rigoroso de SLAs e ofereça um portal de autoatendimento intuitivo para máxima satisfação dos usuários.',
    tags: ['Suporte', 'Tickets', 'SLA'],
    price: '59'
  },
  {
    id: 'core-engine',
    image: product3,
    icon: '⚙️',
    title: '[CORE] - Core Engine',
    description: 'O motor central da sua operação. Alta performance, segurança avançada e integrações nativas em um só lugar.',
    fullDescription: 'A infraestrutura definitiva para sustentar as suas aplicações mais críticas. O Core Engine processa grandes volumes de dados com latência mínima, gerenciando permissões complexas, autenticação segura de usuários e conectando todos os módulos do seu ecossistema através de APIs resilientes.',
    tags: ['Backend', 'Infraestrutura', 'API'],
    price: '129'
  },
  {
    id: 'fiscal-finance',
    image: product4,
    icon: '📊',
    title: '[FISC] - Fiscal & Finance',
    description: 'Controle total sobre seu fluxo de caixa, emissão de notas e conciliação bancária sem complicações operacionais.',
    fullDescription: 'Mantenha a saúde financeira da sua empresa sempre em dia com um módulo completo de gestão fiscal. Automatize a emissão de notas fiscais, gerencie contas a pagar e receber, realize conciliação bancária automática com os principais bancos e gere relatórios precisos de DRE com apenas alguns cliques.',
    tags: ['Finanças', 'Notas Fiscais', 'DRE'],
    price: '99'
  }
];
