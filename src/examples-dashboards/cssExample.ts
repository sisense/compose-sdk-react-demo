export const cssExample = `.dashboard-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-areas:
      "i c4 c4 c4 c4 c5 c5 c5 c5 filters"
      "i c4 c4 c4 c4 c5 c5 c5 c5 filters"
      "i c1 c1 c2 c2 c3 c3 c3 c3 filters"
      "i c1 c1 c2 c2 c3 c3 c3 c3 filters";
  }
  
  .i {
    grid-area: i;
  }
  .f {
    grid-area: filters;
    width: 234px;
    border-bottom: 0;
    border-right: 0;
  
  }
  .c1 {
    grid-area: c1;
  }
  .c2 {
    grid-area: c2;
  }
  .c3 {
    grid-area: c3;
  }
  .c4 {
    grid-area: c4;
  }
  .c5 {
    grid-area: c5;
  }
`;
