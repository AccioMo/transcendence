interface Logo42Props {
  className?: string
  width?: number
  height?: number
}

const Logo42 = ({ className = '', width = 24, height = 17 }: Logo42Props) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 57 40" 
      className={className}
      fill="currentColor"
    >
      <g>
        <polyline points="31.6266585 0.204536082 21.0841616 0.204536082 0 21.0969072 0 29.5538144 21.0841616 29.5538144 21.0841616 40 31.6266585 40 31.6266585 21.0969072 10.5420808 21.0969072 31.6266585 0.204536082"/>
        <polyline points="35.3488372 10.2325581 45.5813953 0 35.3488372 0 35.3488372 10.2325581"/>
        <polyline points="56.744186 10.5424969 56.744186 0 46.5118299 0 46.5118299 10.5424969 36.2790698 21.0849939 36.2790698 31.627907 46.5118299 31.627907 46.5118299 21.0849939 56.744186 10.5424969"/>
        <polyline points="56.744186 21.3953488 46.5116279 31.627907 56.744186 31.627907 56.744186 21.3953488"/>
      </g>
    </svg>
  )
}

export default Logo42 