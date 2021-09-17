declare module "animated-number-react" {
  export default function AnimatedNumber(props: {
    value: string;
    duration: number;
    formatValue: (value: string) => string | JSX.Element;
  }): JSX.Element;
}
