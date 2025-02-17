import CSS from 'csstype';

interface TextProps {
  children: React.ReactNode;
  style?: string;
  color?: string;
  size?: number;
  verticalAlign?: string;
  horizontalAlign?: CSS.Properties['textAlign'];
  containerStyle?: CSS.Properties;
}

export default function Text({ children, style="default", color="black", size=12, verticalAlign="top", horizontalAlign="center", containerStyle}: TextProps) {
  const textStyles:CSS.Properties = {
    color: color,
    fontSize: `${size}pt`,
    verticalAlign: verticalAlign,
    textAlign: horizontalAlign,
    fontStyle: (style.includes("italic") ? "italic" : "normal"),
    textDecoration: (style.includes("underline") ? "underline" : "none"),
    fontWeight: (style.includes("bold") ? "bold" : "normal"),
    textWrap: 'wrap',
  }

  return (
    <div style={{ width: '100%', overflow: 'hidden', ...containerStyle }}>
      <p style={textStyles}>
        {children}
      </p>
    </div>
  );
};