import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";

const CooldownButton = ({ cooldownTime, onClick, children }) => {
  const [cooldown, setCooldown] = useState(cooldownTime);

  useEffect(() => {
    let cooldownInterval;
    if (cooldown > 0) {
      cooldownInterval = setInterval(() => {
        setCooldown((prevCooldown) => Math.max(0, prevCooldown - 1000)); // 1s
      }, 1000);
    } else {
      clearInterval(cooldownInterval);
    }
    return () => clearInterval(cooldownInterval);
  }, [cooldown, cooldownTime]);

  return (
    <Button
      background="#00F0FF"
      onClick={cooldown <= 0 ? onClick : () => null}
      isDisabled={cooldown > 0}
      colorScheme="teal"
    >
      {cooldown > 0 ? `(${Math.ceil(cooldown / 1000)}s)` : children}
    </Button>
  );
};

export default CooldownButton;
