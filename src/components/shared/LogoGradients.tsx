export function LogoGradients() {
  return (
    <defs>
      <linearGradient
        id="mlp-bg-grad"
        x1="2"
        y1="2"
        x2="30"
        y2="30"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="var(--color-primary)" />
        <stop offset="0.5" stopColor="var(--color-chart-3)" />
        <stop offset="1" stopColor="var(--color-success)" />
      </linearGradient>
      <linearGradient
        id="mlp-play-grad"
        x1="13"
        y1="11"
        x2="22"
        y2="21"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="var(--color-background)" />
        <stop offset="1" stopColor="var(--color-secondary)" />
      </linearGradient>
    </defs>
  );
}
