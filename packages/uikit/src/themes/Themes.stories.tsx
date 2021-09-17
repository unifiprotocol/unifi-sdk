import styled from "styled-components";
import { DarkTheme } from "./DarkTheme";
import { UnifiTheme } from "./types";

export default {
  title: "Themes/Themes",
};

const Palette = styled.div`
  width: 12rem;
  margin-bottom: 1rem;
`;
const PaletteName = styled.div`
  color: ${(p) => p.theme.txt100};
`;
const PaletteDesc = styled.div`
  font-size: 90%;
  color: ${(p) => p.theme.txt200};
`;
const SampleName = styled.div``;
const SampleValue = styled.div`
  transition: 0.25s all;
  opacity: 0;
`;

const Sample = styled.div<{ color: string }>`
  height: 4rem;
  padding: 0.25rem;
  color: "#fff";
  background: ${(p) => p.color};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 0.9rem;
  div {
    transition: 0.25s all;
    padding: 0.2rem;
    border-radius: 5px;
  }
  &:hover {
    div {
      background: rgba(0, 0, 0, 0.4);
    }
    ${SampleValue} {
      opacity: 1;
    }
  }
`;

const HGrid = styled.div`
  display: flex;
  gap: 1rem;
`;
const ThemeExpo = (theme: UnifiTheme) => (
  <>
    <h1>Theme: {theme.name}</h1>
    <h2>Colors</h2>
    <HGrid>
      <Palette>
        <PaletteName>Primary & Success</PaletteName>
        {["primaryLight", "primary", "primaryDark"].map((name) => (
          <Sample color={theme[name]}>
            <SampleName>{name}</SampleName>
            <SampleValue>{theme[name]}</SampleValue>
          </Sample>
        ))}
      </Palette>
      <Palette>
        <PaletteName>Warning</PaletteName>
        {["warningLight", "warning", "warningDark"].map((name) => (
          <Sample color={theme[name]}>
            <SampleName>{name}</SampleName>
            <SampleValue>{theme[name]}</SampleValue>
          </Sample>
        ))}
      </Palette>
      <Palette>
        <PaletteName>Info</PaletteName>
        {["infoLight", "info", "infoDark"].map((name) => (
          <Sample color={theme[name]}>
            <SampleName>{name}</SampleName>
            <SampleValue>{theme[name]}</SampleValue>
          </Sample>
        ))}
      </Palette>
      <Palette>
        <PaletteName>Danger</PaletteName>
        {["dangerLight", "danger", "dangerDark"].map((name) => (
          <Sample color={theme[name]}>
            <SampleName>{name}</SampleName>
            <SampleValue>{theme[name]}</SampleValue>
          </Sample>
        ))}
      </Palette>
    </HGrid>
    <h2>Background & Text</h2>
    <HGrid>
      <Palette>
        <PaletteName>Background</PaletteName>
        <PaletteDesc>
          Body BG should be reserved for the body and input backgrounds only.
          Each background color is for different levels of depth
        </PaletteDesc>
        {["bgBody", "bg100", "bg200", "bg300"].map((name) => (
          <Sample color={theme[name]}>
            <SampleName>{name}</SampleName>
            <SampleValue>{theme[name]}</SampleValue>
          </Sample>
        ))}
      </Palette>
      <Palette>
        <PaletteName>Text</PaletteName>
        <PaletteDesc>
          Not to much to say, just colors that contrast with the background.
          Muted color is for disabled elements.
        </PaletteDesc>
        {["txt100", "txt200", "txt300", "txtMuted"].map((name) => (
          <Sample color={theme[name]}>
            <SampleName>{name}</SampleName>
            <SampleValue>{theme[name]}</SampleValue>
          </Sample>
        ))}
      </Palette>
      <Palette>
        <PaletteName>Input background</PaletteName>
        <PaletteDesc>
          The input will have page background in order to have contrast with all
          container backgrounds. Therefore, the input should not go directly
          inside the body
        </PaletteDesc>
        <Sample color={theme.inputBg}>
          <SampleName>inputBg</SampleName>
          <SampleValue>{theme.inputBg}</SampleValue>
        </Sample>
      </Palette>
    </HGrid>
    <h2>Special backgrounds</h2>
    <HGrid>
      <Palette>
        <PaletteName>Shiny</PaletteName>

        <Sample color={theme.shinyGradient}>
          <SampleName>shinyGradient</SampleName>
          <SampleValue>{theme.shinyGradient}</SampleValue>
        </Sample>
      </Palette>
      <Palette>
        <PaletteName>Hot</PaletteName>
        <Sample color={theme.hotGradient}>
          <SampleName>hotGradient</SampleName>
          <SampleValue>{theme.hotGradient}</SampleValue>
        </Sample>
      </Palette>
    </HGrid>
  </>
);

export const Dark = () => ThemeExpo(DarkTheme);
