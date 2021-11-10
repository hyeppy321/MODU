import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input, Button } from 'reactstrap';

const SearchInput = () => {
  return (
    <Form inline className="cr-search-form" onSubmit={e => e.preventDefault()}>
      <MdSearch
        size="20"
        className="cr-search-form__icon-search text-secondary"
      />
      <Input
        type="search"
        className="cr-search-form__input"
        placeholder="Search..."
      />
      &nbsp;&nbsp;&nbsp;
      <Button color="secondary">검색</Button>
    </Form>
  );
};

export default SearchInput;
