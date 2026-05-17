import { useState } from 'react';
import { NavLink } from 'react-router';
import { Code, Group, Text } from '@mantine/core';
import classes from './NavbarSimple.module.css';
import { SignOutIcon } from '@phosphor-icons/react';
import { NavbarItem } from './types';

export function NavbarSimple(props:{data?:NavbarItem[]}) {
  const [active, setActive] = useState('Students');

  const links = props?.data?.map((item) => (
    <NavLink
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      data-testid={item.label}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={"1.5"} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Text size="lg" fw="bold">
            Classroom Planner
          </Text>
          <Code fw={700}>v0.0.1</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <SignOutIcon  className={classes.linkIcon} stroke={"1.5"} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}