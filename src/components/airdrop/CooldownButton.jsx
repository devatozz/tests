'use client';
import React, { useState, useEffect } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';

const CooldownButton = ({ cooldownTime, onClick, children }) => {
  const [cooldown, setCooldown] = useState(cooldownTime);

  useEffect(() => {
    setCooldown(cooldownTime);
  }, [cooldownTime]);

  function msToTime(duration) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    const hoursDisplay = hours < 10 ? '0' + hours : hours;
    const minutesDisplay = minutes < 10 ? '0' + minutes : minutes;
    const secondsDisplay = seconds < 10 ? '0' + seconds : seconds;

    return hoursDisplay + ':' + minutesDisplay + ':' + secondsDisplay;
  }

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
    <Flex flexDirection={'column'} gap={'30px'}>
      <Button
        background={cooldown > 0 ? '#CACACA' : '#00F0FF'}
        onClick={cooldown <= 0 ? onClick : () => null}
        isDisabled={cooldown > 0}
        color={'#18215D'}
      >
        {children}
      </Button>
      {cooldown > 0 && <Text color={'#FFFFFF'}>({msToTime(cooldown)}s)</Text>}
    </Flex>
  );
};

export default CooldownButton;
