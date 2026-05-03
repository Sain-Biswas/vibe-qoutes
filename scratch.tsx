import React from 'react';
import { renderToString } from 'react-dom/server';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './src/components/ui/select';

const html = renderToString(
  <Select value="item-1" onValueChange={() => {}}>
    <SelectTrigger><SelectValue placeholder="placeholder" /></SelectTrigger>
    <SelectContent>
      <SelectItem value="item-1">Item One</SelectItem>
      <SelectItem value="item-2">Item Two</SelectItem>
    </SelectContent>
  </Select>
);
console.log(html);
