import { DrilldownBreadcrumbsProps } from '@sisense/sdk-ui';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  background-color: white;
  min-width: 480px;
`;

const BreadcrumbList = styled.ul`
  display: flex;
  border-radius: 10px;
  margin: auto;
  text-align: center;
  top: 50%;
  width: 100%;
  height: 40px;
  z-index: 1;
  justify-content: center;
`;

const BreadcrumbItem = styled.li`
  background-color: white;
  color: #252525;
  font-family: 'Oswald', sans-serif;
  border-radius: 7px;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  transform: skew(-21deg);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
  margin: 5px;
  padding: 0 15px;

  &:hover {
    border: 1px solid black;
    color: black;
    text-overflow: ellipsis;
  }
`;

const InteractiveBreadcrumbItem = styled.li`
  background-color: rgba(173, 216, 230, 0.5);
  color: #252525;
  font-family: 'Oswald', sans-serif;
  border-radius: 7px;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  transform: skew(-21deg);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
  margin: 5px;
  padding: 0 15px;
  cursor: pointer;

  &:hover {
    border: 1px solid black;
    background: rgb(173, 216, 230);
    color: black;
    text-overflow: ellipsis;
  }
`;

const BreadcrumbInner = styled.span`
  display: flex;
  flex-direction: column;
  margin: auto;
  z-index: 2;
  transform: skew(21deg);
`;

const BreadcrumbTitle = styled.span`
  word-break: normal;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
`;

export const CustomDrilldownBreadcrumbs = ({
  filtersDisplayValues,
  currentDimension,
  clearDrilldownSelections,
  sliceDrilldownSelections,
}: DrilldownBreadcrumbsProps) => {
  if (!filtersDisplayValues.length) return null;

  return (
    <Container>
      <BreadcrumbList>
        <InteractiveBreadcrumbItem>
          <BreadcrumbInner onClick={clearDrilldownSelections}>
            <BreadcrumbTitle>Clear</BreadcrumbTitle>
          </BreadcrumbInner>
        </InteractiveBreadcrumbItem>
        {filtersDisplayValues.map((filterDisplayValue, i) => {
          const isInteractive = i < filtersDisplayValues.length - 1;
          const Item = isInteractive ? InteractiveBreadcrumbItem : BreadcrumbItem;
          return (
            <Item key={i}>
              <BreadcrumbInner onClick={() => sliceDrilldownSelections(i + 1)}>
                <BreadcrumbTitle>{filterDisplayValue.join(' | ')}</BreadcrumbTitle>
              </BreadcrumbInner>
            </Item>
          );
        })}
        <BreadcrumbItem style={{ backgroundColor: 'white', cursor: 'default' }}>
          <BreadcrumbInner>
            <BreadcrumbTitle>{`${
              currentDimension.expression.match(/\[(.*?)]/)?.[1]?.split('.')[1] || ''
            } (All)`}</BreadcrumbTitle>
          </BreadcrumbInner>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Container>
  );
};
