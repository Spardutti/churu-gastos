interface HeadingProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  label: string;
}

const Heading = ({ variant, label }: HeadingProps) => {
  // return a h tag depending on the variant
  const styles = {
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
    h5: 'text-lg',
    h6: 'text-md',
  };

  if (variant === 'h1') return <h1 className={styles.h1}>{label}</h1>;
  if (variant === 'h2') return <h2 className={styles.h2}>{label}</h2>;
  if (variant === 'h3') return <h3 className={styles.h3}>{label}</h3>;
  if (variant === 'h4') return <h4 className={styles.h4}>{label}</h4>;
  if (variant === 'h5') return <h5 className={styles.h5}>{label}</h5>;
  if (variant === 'h6') return <h6 className={styles.h6}>{label}</h6>;
};

export default Heading;
