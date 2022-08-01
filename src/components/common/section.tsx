import styled from 'styled-components';

interface ISectionProps {
  row?: boolean;
  padding?: string;
}

const StyledSection = styled.div<ISectionProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${(props) => (props.row ? 'row' : 'column')};
  justify-content: center;
  align-items: center;
  padding-bottom: ${(props) => props.padding};
`;

function Section({
  row,
  padding,
  children,
}: {
  row?: boolean;
  padding?: string;
  children: any;
}) {
  return (
    <StyledSection row={row} padding={padding}>
      {children}
    </StyledSection>
  );
}

export default Section;
