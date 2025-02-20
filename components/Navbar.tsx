'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from './ui/button';

type Props = {
  title: string;
  setNumQuestions: React.Dispatch<React.SetStateAction<number>>;
  triggerReload: () => void;
};

const Navbar = ({ title, setNumQuestions, triggerReload }: Props) => {
  // Set initial value as 'ten' (which represents 10)
  const [selectedValue, setSelectedValue] = useState('ten');

  // Handler to update the numQuestions value based on the selected option
  const handleSelectChange = (value: string) => {
    switch (value) {
      case 'ten':
        setNumQuestions(10);
        triggerReload();
        setSelectedValue('ten');
        break;
      case 'twenty':
        setNumQuestions(20);
        triggerReload();
        setSelectedValue('twenty');
        break;
      case 'thirty':
        setNumQuestions(30);
        triggerReload();
        setSelectedValue('thirty');
        break;
      case 'fifty':
        setNumQuestions(50);
        triggerReload();
        setSelectedValue('fifty');
        break;
      case 'hundred':
        setNumQuestions(100);
        triggerReload();
        setSelectedValue('hundred');
        break;
      case 'all':
        setNumQuestions(-1); // Assuming `-1` means "All" in your case
        triggerReload();
        setSelectedValue('all');
        break;
      default:
        setNumQuestions(10); // Default fallback
    }
  };

  // Set the default value to 10 or whatever is stored in state
  const handleSetToDefault = () => {
    setSelectedValue('ten');
    setNumQuestions(10);
    triggerReload();
  };

  return (
    <nav className='border-b bg-sky-950 text-white lg:sticky top-0'>
      <div className='container flex flex-col sm:flex-row  sm:justify-between sm:items-center flex-wrap gap-4 py-8'>
        <div className='flex gap-4 items-center text-2xl font-bold text-white'>
          <Link href='/' onClick={handleSetToDefault}>
            {title}
          </Link>
        </div>
        <div className='inline-flex items-center'>
          <label htmlFor='numQuestions'>Number of Questions</label>
          <Select value={selectedValue} onValueChange={handleSelectChange}>
            <SelectTrigger className='w-[70px] mx-4'>
              <SelectValue placeholder='10' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='ten'>10</SelectItem>
                <SelectItem value='twenty'>20</SelectItem>
                <SelectItem value='thirty'>30</SelectItem>
                <SelectItem value='fifty'>50</SelectItem>
                <SelectItem value='hundred'>100</SelectItem>
                <SelectItem value='all'>All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button>
          <Link
            href='https://paypal.me/pythontiger?country.x=US&locale.x=en_US'
            target='_blank'
          >
            Support My Work 💖
          </Link>
        </Button>
      </div>
    </nav>
  );
};
export default Navbar;
