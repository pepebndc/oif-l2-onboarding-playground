import { useState } from 'react'
import { 
  Layers, 
  Check, 
  AlertCircle,
  Loader2,
  ExternalLink,
  Wallet,
  Settings,
  Info,
  Mail,
  Clock,
  Shield,
  Bell,
  Send
} from 'lucide-react'

// Real chain icons as SVG components
const ChainIcons = {
  ethereum: () => (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <g fill="none" fillRule="evenodd">
        <circle cx="16" cy="16" r="16" fill="#627EEA"/>
        <g fill="#FFF" fillRule="nonzero">
          <path fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z"/>
          <path d="M16.498 4L9 16.22l7.498-3.35z"/>
          <path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z"/>
          <path d="M16.498 27.995v-6.028L9 17.616z"/>
          <path fillOpacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/>
          <path fillOpacity=".602" d="M9 16.22l7.498 4.353v-7.701z"/>
        </g>
      </g>
    </svg>
  ),
  arbitrum: () => (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <g fill="none">
        <circle cx="16" cy="16" r="16" fill="#2D374B"/>
        <path fill="#28A0F0" d="M16.8 10.6l5.2 8.3-2.4 1.4-3.9-6.2-1.1 1.7 3.3 5.3-2.4 1.4-4.4-7z"/>
        <path fill="#FFF" d="M20.5 21.7l2.4-1.4.8 1.3-2.4 1.4zM11.3 21.7l-2.4-1.4-.8 1.3 2.4 1.4z"/>
        <path fill="#28A0F0" d="M15.2 10.6l-5.2 8.3 2.4 1.4 3.9-6.2 1.1 1.7-3.3 5.3 2.4 1.4 4.4-7z"/>
      </g>
    </svg>
  ),
  optimism: () => (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <circle cx="16" cy="16" r="16" fill="#FF0420"/>
      <path fill="#FFF" d="M10.9 19.2c-1.5 0-2.7-.4-3.5-1.2-.8-.8-1.2-2-1.2-3.4 0-1 .2-1.9.6-2.7.4-.8 1-1.4 1.8-1.9.8-.4 1.7-.7 2.7-.7 1.4 0 2.5.4 3.3 1.2.8.8 1.2 1.9 1.2 3.3 0 1-.2 2-.6 2.8-.4.8-1 1.4-1.8 1.9-.8.5-1.6.7-2.5.7zm.2-2.1c.5 0 1-.2 1.3-.5.3-.3.6-.8.7-1.3.2-.6.2-1.1.2-1.7 0-.7-.2-1.2-.5-1.6-.3-.4-.8-.6-1.4-.6-.5 0-1 .2-1.3.5-.3.3-.6.8-.8 1.3-.2.6-.2 1.1-.2 1.7 0 .7.2 1.2.5 1.6.4.4.9.6 1.5.6zm7.4 1.9V10.6h2.3l.2 1.3c.3-.5.7-.9 1.2-1.1.5-.3 1-.4 1.6-.4.9 0 1.6.3 2.1.8.5.5.8 1.3.8 2.3V19h-2.6v-5c0-.5-.1-.9-.3-1.2-.2-.3-.6-.4-1-.4-.5 0-.9.2-1.2.5-.3.4-.5.9-.5 1.5V19h-2.6z"/>
    </svg>
  ),
  base: () => (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <circle cx="16" cy="16" r="16" fill="#0052FF"/>
      <path fill="#FFF" d="M16 6c5.5 0 10 4.5 10 10s-4.5 10-10 10S6 21.5 6 16h8v-2H6.2c.5-4.5 4.3-8 8.8-8h1v8h-2V8.2c-3.4.5-6 3.3-6 6.8 0 3.9 3.1 7 7 7s7-3.1 7-7-3.1-7-7-7h-1V6h1z"/>
    </svg>
  ),
  zksync: () => (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <circle cx="16" cy="16" r="16" fill="#8C8DFC"/>
      <path fill="#FFF" d="M22.5 11L16 16l6.5 5v-3.5L19 16l3.5-1.5V11zM9.5 21l6.5-5-6.5-5v3.5L13 16l-3.5 1.5V21z"/>
    </svg>
  ),
  linea: () => (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <circle cx="16" cy="16" r="16" fill="#121212"/>
      <path fill="#FFF" d="M8 22V10h2.5v9.6h6.1V22H8zm10.4 0V10h2.5v12h-2.5z"/>
    </svg>
  ),
  polygon: () => (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
      <circle cx="16" cy="16" r="16" fill="#8247E5"/>
      <path fill="#FFF" d="M21.2 13.3c-.4-.2-.9-.2-1.2 0l-2.8 1.6-1.9 1.1-2.8 1.6c-.4.2-.9.2-1.2 0l-2.2-1.3c-.4-.2-.6-.6-.6-1v-2.5c0-.4.2-.8.6-1l2.2-1.2c.4-.2.9-.2 1.2 0l2.2 1.3c.4.2.6.6.6 1v1.6l1.9-1.1v-1.6c0-.4-.2-.8-.6-1l-4-2.3c-.4-.2-.9-.2-1.2 0l-4.1 2.4c-.4.2-.6.6-.6 1v4.6c0 .4.2.8.6 1l4.1 2.4c.4.2.9.2 1.2 0l2.8-1.6 1.9-1.1 2.8-1.6c.4-.2.9-.2 1.2 0l2.2 1.2c.4.2.6.6.6 1v2.5c0 .4-.2.8-.6 1l-2.2 1.3c-.4.2-.9.2-1.2 0l-2.2-1.3c-.4-.2-.6-.6-.6-1v-1.6l-1.9 1.1v1.6c0 .4.2.8.6 1l4.1 2.4c.4.2.9.2 1.2 0l4.1-2.4c.4-.2.6-.6.6-1v-4.6c0-.4-.2-.8-.6-1l-4.2-2.5z"/>
    </svg>
  ),
}

const parentNetworks = [
  { id: 'ethereum', name: 'Ethereum Mainnet', type: 'L1' },
  { id: 'arbitrum', name: 'Arbitrum One', type: 'L2' },
  { id: 'optimism', name: 'OP Mainnet', type: 'L2' },
  { id: 'base', name: 'Base', type: 'L2' },
  { id: 'zksync', name: 'zkSync Era', type: 'L2' },
  { id: 'polygon', name: 'Polygon PoS', type: 'L1' },
]

const rollupStacks = [
  { 
    id: 'op', 
    name: 'OP Stack', 
    description: 'Optimism\'s modular rollup framework',
    color: '#FF0420',
    chains: ['Base', 'Zora', 'Mode', 'Worldchain', 'Mint']
  },
  { 
    id: 'arbitrum', 
    name: 'Arbitrum Orbit', 
    description: 'Arbitrum\'s L2/L3 deployment stack',
    color: '#28A0F0',
    chains: ['Arbitrum Nova', 'Xai', 'Treasure', 'Sanko']
  },
]

const hubChains = [
  { id: 'ethereum', name: 'Ethereum Mainnet', settlementTime: '~15 min' },
  { id: 'arbitrum', name: 'Arbitrum One', settlementTime: '~7 min' },
  { id: 'optimism', name: 'Optimism', settlementTime: '~7 min' },
  { id: 'base', name: 'Base', settlementTime: '~7 min' },
  { id: 'zksync', name: 'zkSync Era', settlementTime: '~1 min' },
  { id: 'linea', name: 'Linea', settlementTime: '~2 min' },
]

export default function NewNetworkOnboarding() {
  const [formData, setFormData] = useState({
    chainName: '',
    chainId: '',
    rpcUrl: '',
    explorerUrl: '',
    rollupStack: '',
    parentChain: '',
    hubChain: '',
    notificationEmail: '',
  })
  
  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [requestSubmitted, setRequestSubmitted] = useState(false)

  // Wallet connection state
  const [walletConnecting, setWalletConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState(null)

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Connect wallet handler
  const connectWallet = () => {
    setWalletConnecting(true)
    setTimeout(() => {
      setWalletAddress('0x1234567890abcdef1234567890abcdef12345678')
      setWalletConnecting(false)
    }, 1000)
  }

  // Submit request
  const submitRequest = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setRequestSubmitted(true)
      setIsSubmitting(false)
    }, 2000)
  }

  // Check if form is complete
  const isFormComplete = walletAddress && 
    formData.chainName && 
    formData.chainId && 
    formData.rpcUrl && 
    formData.rollupStack && 
    formData.parentChain && 
    formData.hubChain &&
    formData.notificationEmail

  const renderChainIcon = (chainId) => {
    const IconComponent = ChainIcons[chainId]
    return IconComponent ? <IconComponent /> : null
  }

  // Request Submitted Screen
  if (requestSubmitted) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--oz-bg)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="oz-card p-8 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'var(--oz-blue-light)' }}>
              <Mail className="w-10 h-10" style={{ color: 'var(--oz-blue)' }} />
            </div>
            <h2 className="text-3xl font-bold mb-3 gradient-text">Request Submitted!</h2>
            <p className="mb-8 max-w-md mx-auto" style={{ color: 'var(--oz-text-muted)' }}>
              Your solver deployment request has been submitted to the OpenZeppelin team for review.
            </p>
            
            {/* Expected timeline */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full oz-card mb-8">
              <Clock className="w-4 h-4" style={{ color: 'var(--oz-blue)' }} />
              <span className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>
                Expected review time: <span className="font-medium" style={{ color: 'var(--oz-text)' }}>1-2 business days</span>
              </span>
            </div>

            {/* Summary */}
            <div className="p-6 rounded-xl text-left mb-8" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
              <h3 className="font-medium mb-4 text-center" style={{ color: 'var(--oz-text)' }}>Request Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--oz-text-muted)' }}>Network</span>
                  <span className="font-medium" style={{ color: 'var(--oz-text)' }}>{formData.chainName}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--oz-text-muted)' }}>Chain ID</span>
                  <span className="font-mono" style={{ color: 'var(--oz-text)' }}>{formData.chainId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: 'var(--oz-text-muted)' }}>Rollup Stack</span>
                  <span className="flex items-center gap-2">
                    {formData.rollupStack && (
                      <span 
                        className="w-2 h-2 rounded-full" 
                        style={{ background: rollupStacks.find(s => s.id === formData.rollupStack)?.color }}
                      />
                    )}
                    <span style={{ color: 'var(--oz-text)' }}>
                      {rollupStacks.find(s => s.id === formData.rollupStack)?.name}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: 'var(--oz-text-muted)' }}>Parent (L1)</span>
                  <span className="flex items-center gap-2">
                    {formData.parentChain && (
                      <span className="w-5 h-5">{renderChainIcon(formData.parentChain)}</span>
                    )}
                    <span style={{ color: 'var(--oz-text)' }}>{parentNetworks.find(h => h.id === formData.parentChain)?.name}</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: 'var(--oz-text-muted)' }}>HUB Chain</span>
                  <span className="flex items-center gap-2">
                    {formData.hubChain && (
                      <span className="w-5 h-5">{renderChainIcon(formData.hubChain)}</span>
                    )}
                    <span style={{ color: 'var(--oz-text)' }}>{hubChains.find(h => h.id === formData.hubChain)?.name}</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--oz-text-muted)' }}>Owner Wallet</span>
                  <code className="font-mono text-xs" style={{ color: 'var(--oz-text)' }}>
                    {walletAddress?.slice(0, 10)}...{walletAddress?.slice(-6)}
                  </code>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--oz-text-muted)' }}>Status</span>
                  <span className="flex items-center gap-2 text-amber-500">
                    <span className="status-dot status-pending" />
                    Pending Review
                  </span>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="p-4 rounded-xl mb-8 text-left" style={{ background: 'var(--oz-blue-light)', border: '1px solid rgba(78, 94, 228, 0.1)' }}>
              <h4 className="font-medium mb-3 flex items-center gap-2" style={{ color: 'var(--oz-blue)' }}>
                <Info className="w-4 h-4" />
                What happens next?
              </h4>
              <ol className="space-y-2 text-sm list-decimal list-inside" style={{ color: 'var(--oz-text-muted)' }}>
                <li>OpenZeppelin team reviews your configuration</li>
                <li>Required contracts are deployed on your chain</li>
                <li>Solver instance is created with a secure KMS signer</li>
                <li>You'll receive an email notification when approved</li>
                <li>Return to the dashboard to configure tokens and fund your solver</li>
              </ol>
            </div>

            {/* Notification reminder */}
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl mb-8" 
              style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <Bell className="w-5 h-5 text-emerald-500" />
              <span className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>
                We'll notify you at <span className="font-medium text-emerald-600">{formData.notificationEmail}</span> when your solver is ready
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/dashboard"
                className="oz-btn-primary px-6 py-3 inline-flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Go to Dashboard
              </a>
              <a
                href="/"
                className="oz-btn-secondary px-6 py-3 inline-flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--oz-bg)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full oz-card mb-6">
            <Layers className="w-4 h-4" style={{ color: 'var(--oz-blue)' }} />
            <span className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>Network Onboarding</span>
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--oz-text)' }}>Onboard Your L2</h1>
          <p style={{ color: 'var(--oz-text-muted)' }} className="max-w-xl mx-auto">
            Submit your chain details and we'll set up the OIF infrastructure for your network.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="oz-card p-8">
          <div className="animate-fade-in">
            {/* Trust Banner */}
            <div className="flex items-start gap-4 p-4 rounded-xl mb-8" 
              style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                <Shield className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h4 className="font-medium mb-1 text-emerald-600 dark:text-emerald-400">Reviewed by OpenZeppelin</h4>
                <p className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>
                  Every deployment request is reviewed by the OpenZeppelin team. We'll deploy the required contracts, 
                  set up a secure KMS signer, and notify you when your solver is ready to configure.
                </p>
              </div>
            </div>

            {/* Wallet Connection */}
            <div className="p-4 rounded-xl mb-8" style={{ background: 'var(--oz-surface)', border: '1px solid var(--oz-border)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--oz-blue-light)' }}>
                    <Wallet className="w-5 h-5" style={{ color: 'var(--oz-blue)' }} />
                  </div>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--oz-text)' }}>Wallet Connection</div>
                    <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>
                      {walletAddress ? 'Connected - This wallet will be the solver owner' : 'Connect your wallet to continue'}
                    </div>
                  </div>
                </div>
                
                {walletAddress ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'var(--oz-bg)', border: '1px solid var(--oz-border)' }}>
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <code className="text-sm font-mono" style={{ color: 'var(--oz-text)' }}>
                        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                      </code>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={connectWallet}
                    disabled={walletConnecting}
                    className="oz-btn-primary px-4 py-2 flex items-center gap-2 disabled:opacity-50"
                  >
                    {walletConnecting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Wallet className="w-4 h-4" />
                        Connect Wallet
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--oz-text)' }}>Network Details</h2>
            <p style={{ color: 'var(--oz-text-muted)' }} className="mb-6">Provide information about your L2 chain.</p>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>Chain Name *</label>
                  <input
                    type="text"
                    name="chainName"
                    value={formData.chainName}
                    onChange={handleInputChange}
                    placeholder="e.g., My L2 Network"
                    className="oz-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>Chain ID *</label>
                  <input
                    type="text"
                    name="chainId"
                    value={formData.chainId}
                    onChange={handleInputChange}
                    placeholder="e.g., 42161"
                    className="oz-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>RPC URL *</label>
                <input
                  type="text"
                  name="rpcUrl"
                  value={formData.rpcUrl}
                  onChange={handleInputChange}
                  placeholder="https://rpc.your-network.io"
                  className="oz-input font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>Block Explorer URL</label>
                <input
                  type="text"
                  name="explorerUrl"
                  value={formData.explorerUrl}
                  onChange={handleInputChange}
                  placeholder="https://explorer.your-network.io"
                  className="oz-input font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: 'var(--oz-text)' }}>Rollup Stack *</label>
                <p className="text-sm mb-4" style={{ color: 'var(--oz-text-muted)' }}>
                  Select the rollup framework your L2 is built on.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {rollupStacks.map((stack) => (
                    <button
                      key={stack.id}
                      onClick={() => setFormData({ ...formData, rollupStack: stack.id })}
                      className="flex items-start gap-4 p-4 rounded-xl border transition-all text-left"
                      style={{
                        background: formData.rollupStack === stack.id ? `${stack.color}10` : 'var(--oz-surface)',
                        borderColor: formData.rollupStack === stack.id ? stack.color : 'var(--oz-border)'
                      }}
                    >
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${stack.color}20` }}
                      >
                        {stack.id === 'op' ? (
                          <svg viewBox="0 0 32 32" className="w-7 h-7">
                            <circle cx="16" cy="16" r="16" fill={stack.color}/>
                            <path fill="#FFF" d="M10.9 19.2c-1.5 0-2.7-.4-3.5-1.2-.8-.8-1.2-2-1.2-3.4 0-1 .2-1.9.6-2.7.4-.8 1-1.4 1.8-1.9.8-.4 1.7-.7 2.7-.7 1.4 0 2.5.4 3.3 1.2.8.8 1.2 1.9 1.2 3.3 0 1-.2 2-.6 2.8-.4.8-1 1.4-1.8 1.9-.8.5-1.6.7-2.5.7zm.2-2.1c.5 0 1-.2 1.3-.5.3-.3.6-.8.7-1.3.2-.6.2-1.1.2-1.7 0-.7-.2-1.2-.5-1.6-.3-.4-.8-.6-1.4-.6-.5 0-1 .2-1.3.5-.3.3-.6.8-.8 1.3-.2.6-.2 1.1-.2 1.7 0 .7.2 1.2.5 1.6.4.4.9.6 1.5.6zm7.4 1.9V10.6h2.3l.2 1.3c.3-.5.7-.9 1.2-1.1.5-.3 1-.4 1.6-.4.9 0 1.6.3 2.1.8.5.5.8 1.3.8 2.3V19h-2.6v-5c0-.5-.1-.9-.3-1.2-.2-.3-.6-.4-1-.4-.5 0-.9.2-1.2.5-.3.4-.5.9-.5 1.5V19h-2.6z"/>
                          </svg>
                        ) : (
                          <svg viewBox="0 0 32 32" className="w-7 h-7">
                            <g fill="none">
                              <circle cx="16" cy="16" r="16" fill="#2D374B"/>
                              <path fill={stack.color} d="M16.8 10.6l5.2 8.3-2.4 1.4-3.9-6.2-1.1 1.7 3.3 5.3-2.4 1.4-4.4-7z"/>
                              <path fill="#FFF" d="M20.5 21.7l2.4-1.4.8 1.3-2.4 1.4zM11.3 21.7l-2.4-1.4-.8 1.3 2.4 1.4z"/>
                              <path fill={stack.color} d="M15.2 10.6l-5.2 8.3 2.4 1.4 3.9-6.2 1.1 1.7-3.3 5.3 2.4 1.4 4.4-7z"/>
                            </g>
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium" style={{ color: 'var(--oz-text)' }}>{stack.name}</span>
                          {formData.rollupStack === stack.id && (
                            <Check className="w-4 h-4" style={{ color: stack.color }} />
                          )}
                        </div>
                        <div className="text-xs mb-2" style={{ color: 'var(--oz-text-muted)' }}>{stack.description}</div>
                        <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>
                          <span className="opacity-60">Examples:</span> {stack.chains.slice(0, 3).join(', ')}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: 'var(--oz-text)' }}>Parent Network (L1) *</label>
                <p className="text-sm mb-4" style={{ color: 'var(--oz-text-muted)' }}>
                  Select the parent chain that your L2 settles to.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {parentNetworks.map((chain) => (
                    <button
                      key={chain.id}
                      onClick={() => setFormData({ ...formData, parentChain: chain.id })}
                      className="flex items-center gap-4 p-4 rounded-xl border transition-all text-left"
                      style={{
                        background: formData.parentChain === chain.id ? 'rgba(16, 185, 129, 0.1)' : 'var(--oz-surface)',
                        borderColor: formData.parentChain === chain.id ? 'var(--oz-success)' : 'var(--oz-border)'
                      }}
                    >
                      <div className="flex-shrink-0">
                        {renderChainIcon(chain.id)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate" style={{ color: 'var(--oz-text)' }}>{chain.name}</div>
                        <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>{chain.type}</div>
                      </div>
                      {formData.parentChain === chain.id && (
                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: 'var(--oz-text)' }}>Select HUB Chain *</label>
                <p className="text-sm mb-4" style={{ color: 'var(--oz-text-muted)' }}>
                  Choose a HUB chain based on settlement speed and liquidity availability.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {hubChains.map((chain) => (
                    <button
                      key={chain.id}
                      onClick={() => setFormData({ ...formData, hubChain: chain.id })}
                      className="flex items-center gap-4 p-4 rounded-xl border transition-all text-left"
                      style={{
                        background: formData.hubChain === chain.id ? 'var(--oz-blue-light)' : 'var(--oz-surface)',
                        borderColor: formData.hubChain === chain.id ? 'var(--oz-blue)' : 'var(--oz-border)'
                      }}
                    >
                      <div className="flex-shrink-0">
                        {renderChainIcon(chain.id)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate" style={{ color: 'var(--oz-text)' }}>{chain.name}</div>
                        <div className="text-xs" style={{ color: 'var(--oz-text-muted)' }}>Settlement: {chain.settlementTime}</div>
                      </div>
                      {formData.hubChain === chain.id && (
                        <Check className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--oz-blue)' }} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notification Email */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--oz-text)' }}>Notification Email *</label>
                <p className="text-xs mb-3" style={{ color: 'var(--oz-text-muted)' }}>
                  We'll notify you at this email when your solver is ready for configuration.
                </p>
                <input
                  type="email"
                  name="notificationEmail"
                  value={formData.notificationEmail}
                  onChange={handleInputChange}
                  placeholder="admin@yourchain.io"
                  className="oz-input"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--oz-border)' }}>
              {!isFormComplete && (
                <div className="flex items-start gap-3 p-4 rounded-xl mb-6" 
                  style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm" style={{ color: 'var(--oz-text-muted)' }}>
                    Please fill in all required fields and connect your wallet to submit.
                  </div>
                </div>
              )}
              
              <button
                onClick={submitRequest}
                disabled={!isFormComplete || isSubmitting}
                className="w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed glow-blue"
                style={{ background: 'linear-gradient(to right, var(--oz-blue), #6366f1)' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Deployment Request
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
