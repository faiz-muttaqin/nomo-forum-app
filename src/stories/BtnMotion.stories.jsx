import React from 'react';
import BtnMotion from '../components/BtnMotion';
import '../styles/style.css';
export default {
  title: 'Components/BtnMotion',
  component: BtnMotion,
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
    disabled: { control: 'boolean' },
    style: { control: 'object' },
    onClick: { action: 'clicked' },
  },
};

const Template = (args) => <BtnMotion {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Click Me',
  className: 'btn btn-primary',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled',
  className: 'btn btn-primary',
  disabled: true,
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
  children: 'Custom Style',
  className: 'btn',
  style: {
    background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    borderRadius: '30px',
    padding: '12px 32px',
  },
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: (
    <>
      <span role="img" aria-label="star">
        ⭐
      </span>{' '}
      Starred
    </>
  ),
  className: 'btn btn-primary',
};

export const Playground = Template.bind({});
Playground.args = {
  children: 'Playground',
  className: 'btn btn-primary-orange',
};
