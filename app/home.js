import {
  StyledButton,
  StyledButtonText,
  StyledContainer,
  InnerContainer,
} from "../src/components/styled";

import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <StyledContainer>
      <InnerContainer>
        <Link href="/details" asChild>
          <StyledButton>
            <StyledButtonText>Goto Details</StyledButtonText>
          </StyledButton>
        </Link>
      </InnerContainer>
    </StyledContainer>
  );
}
