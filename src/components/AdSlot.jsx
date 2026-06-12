export default function AdSlot({ type = 'banner', className = '' }) {
  const sizes = {
    banner:   'h-[90px] w-full',
    rectangle:'h-[250px] w-full max-w-[300px]',
    leaderboard: 'h-[90px] w-full max-w-[728px] mx-auto',
  }
  return (
    <div className={`${sizes[type]} ${className} bg-surface border border-dashed border-surface-border rounded-xl flex items-center justify-center`}>
      <span className="text-ink-muted text-xs font-medium tracking-widest uppercase">Advertisement</span>
      {/* Uncomment + replace IDs when AdSense approved:
      <ins className="adsbygoogle" style={{display:'block'}}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true" />
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      */}
    </div>
  )
}
