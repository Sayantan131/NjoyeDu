import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeSwitcher = (props) => {
  const { toggleColorMode } = useColorMode();
  const SwicthIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      variant="ghost"
      color="current"
      right={"4"}
      onClick={toggleColorMode}
      icon={<SwicthIcon />}
      zIndex={"overlay"}
      {...props}
    />
  );
};

export default ColorModeSwitcher;
