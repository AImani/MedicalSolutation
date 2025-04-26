import {SelectField, Button, InputField} from '@/_metronic/partials/controls';
import {Row, Col, Card, ListGroup, Form} from 'react-bootstrap';
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {CreateGroupDto} from '../@types';
import {useState, useEffect, useRef} from 'react';

interface MockUser {
  id: number;
  userName: string;
  phoneNumber: string;
}

class UserService {
  private allUsers: MockUser[];

  constructor() {
    this.allUsers = [
      {id: 1, userName: 'محمد احمدی', phoneNumber: '09191830178'},
      {id: 2, userName: 'علی محمدی', phoneNumber: '09123456789'},
      {id: 3, userName: 'زهرا احمدی', phoneNumber: '09187654321'},
      {id: 4, userName: 'رضا محمدزاده', phoneNumber: '09361234567'},
      {id: 5, userName: 'فاطمه محمدپور', phoneNumber: '09351234567'},
      {id: 6, userName: 'محمد رضایی', phoneNumber: '09121234567'},
      {id: 7, userName: 'سارا محمدیان', phoneNumber: '09371234567'},
      {id: 8, userName: 'امیر احمدزاده', phoneNumber: '09331234567'},
      {id: 9, userName: 'نیلوفر احمدپور', phoneNumber: '09381234567'},
      {id: 10, userName: 'حسین محمدی نژاد', phoneNumber: '09391234567'},
      {id: 11, userName: 'علیرضا احمدیان', phoneNumber: '09151830178'},
      {id: 12, userName: 'محمدرضا احمدزاده', phoneNumber: '09123456788'},
      {id: 13, userName: 'فاطمه محمدزاده', phoneNumber: '09187654322'},
      {id: 14, userName: 'مهدی محمدی', phoneNumber: '09361234568'},
      {id: 15, userName: 'سمیرا کریمی', phoneNumber: '09351234568'},
      {id: 16, userName: 'حمید رضایی', phoneNumber: '09121234568'},
      {id: 17, userName: 'نرگس موسوی', phoneNumber: '09371234568'},
      {id: 18, userName: 'جواد صادقی', phoneNumber: '09331234568'},
      {id: 19, userName: 'لیلا حسینی', phoneNumber: '09381234568'},
      {id: 20, userName: 'امیرعلی نجفی', phoneNumber: '09391234568'},
    ];
  }

  searchUsers(query: string): Promise<MockUser[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!query || query.trim() === '') {
          resolve([]);
          return;
        }

        const normalizedQuery = query.toLowerCase();
        const results = this.allUsers.filter(
          (user) =>
            user.userName.toLowerCase().includes(normalizedQuery) ||
            user.phoneNumber.includes(normalizedQuery)
        );

        resolve(results);
      }, 300);
    });
  }

  getUserById(id: number): MockUser | undefined {
    return this.allUsers.find((user) => user.id === id);
  }
}

const User: React.FC = () => {
  const {t} = useTranslation();
  const form = useFormContext<CreateGroupDto>();

  const [availableUsers, setAvailableUsers] = useState<MockUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<MockUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const userService = new UserService();

  const performSearch = async (query: string) => {
    if (query.trim() === '') {
      setAvailableUsers([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    try {
      const results = await userService.searchUsers(query);

      const filteredResults = results.filter(
        (user) => !selectedUsers.some((selectedUser) => selectedUser.id === user.id)
      );

      setAvailableUsers(filteredResults);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.trim() !== '') {
      setIsSearching(true);
    }

    searchTimeoutRef.current = setTimeout(() => {
      performSearch(query);
    }, 500);
  };

  const handleAddUser = (user: MockUser) => {
    setSelectedUsers([...selectedUsers, user]);
    setAvailableUsers(availableUsers.filter((u) => u.id !== user.id));
  };

  const handleRemoveUser = (user: MockUser) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));

    if (
      searchQuery &&
      (user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phoneNumber.includes(searchQuery))
    ) {
      setAvailableUsers([...availableUsers, user]);
    }
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    console.log('Available Users:', availableUsers);
    console.log('Selected Users:', selectedUsers);
  }, [availableUsers, selectedUsers]);

  return (
    <>
      <Row>
        <Col lg={12} md={6} className='mb-2'>
          <div className='mt-5'>
            <Row>
              <Col lg={6} md={6} sm={12} className='mb-10'>
                <Card>
                  <Card.Header className='p-3 d-flex justify-content-between align-items-center'>
                    <div>
                      <h4 className='card-title m-0'>{t('Patients.Plural')}</h4>
                      {availableUsers.length > 0 && (
                        <span className='text-muted fs-7'>
                          {t('Reports.TotalRecord')} {availableUsers.length}
                        </span>
                      )}
                    </div>
                    {availableUsers.length > 0 && (
                      <Button
                        variant='primary'
                        size='sm'
                        className='btn btn-sm fw-bold btn-primary ms-2'
                        onClick={() => {
                          setSelectedUsers([...selectedUsers, ...availableUsers]);
                          setAvailableUsers([]);
                        }}
                      >
                        <i className='fas fa-check-double me-1'></i>
                        {t('Actions.AddAll')}
                      </Button>
                    )}
                  </Card.Header>
                  <Card.Body className='p-0'>
                    <div className='my-3 w-100 px-3 position-relative'>
                      <Form.Control
                        type='text'
                        placeholder={t('SMSPanel.Search.User')}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className='form-control-solid'
                      />
                      {searchQuery && (
                        <div
                          className='position-absolute d-flex top-50 pe-3 end-0 translate-middle-y me-4 cursor-pointer'
                          onClick={() => {
                            setSearchQuery('');
                            setAvailableUsers([]);
                            setIsSearching(false);
                          }}
                        >
                          <i className='fas fa-times text-muted fs-5'></i>
                        </div>
                      )}
                    </div>
                    <ListGroup variant='flush' style={{maxHeight: '400px', overflowY: 'auto'}}>
                      {isSearching ? (
                        <ListGroup.Item className='text-center py-3'>
                          {t('Actions.Searching')}
                        </ListGroup.Item>
                      ) : (
                        <>
                          {availableUsers.map((user) => (
                            <ListGroup.Item
                              key={user.id}
                              className='d-flex justify-content-between align-items-center pb-3 pt-1'
                            >
                              <div>
                                <div className='fw-bold'>{user.userName}</div>
                                <div className='text-muted fs-7'>{user.phoneNumber}</div>
                              </div>
                              <Button
                                variant='light-primary'
                                className='btn btn-sm fw-bold btn-primary'
                                onClick={() => handleAddUser(user)}
                              >
                                <i className='fas fa-plus'></i>
                              </Button>
                            </ListGroup.Item>
                          ))}
                          {searchQuery && availableUsers.length === 0 && !isSearching && (
                            <ListGroup.Item className='text-center py-3'>
                              {t('User.NotFound')}
                            </ListGroup.Item>
                          )}
                        </>
                      )}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={6} md={6}>
                <Card>
                  <Card.Header className='p-3 d-flex justify-content-between align-items-center'>
                    <div>
                      <h4 className='card-title m-0'>{t('Patients.Selected')}</h4>
                      {selectedUsers.length > 0 && (
                        <span className='text-muted fs-7'>
                          {t('Reports.TotalRecord')} {selectedUsers.length}
                        </span>
                      )}
                    </div>
                    {selectedUsers.length > 0 && (
                      <Button
                        variant='danger'
                        size='sm'
                        className='btn btn-sm fw-bold btn-danger ms-2'
                        onClick={() => {
                          // Add all selected users back to available users if they match the current search
                          if (searchQuery) {
                            const matchingUsers = selectedUsers.filter(
                              (user) =>
                                user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                user.phoneNumber.includes(searchQuery)
                            );
                            setAvailableUsers([...availableUsers, ...matchingUsers]);
                          } else {
                            // If no search query, don't add them back since the list starts empty without a search
                          }
                          setSelectedUsers([]);
                        }}
                      >
                        <i className='fas fa-trash me-2'></i>
                        {t('Actions.RemoveAll')}
                      </Button>
                    )}
                  </Card.Header>
                  <Card.Body className='p-0'>
                    <ListGroup variant='flush' style={{maxHeight: '400px', overflowY: 'auto'}}>
                      {selectedUsers.map((user) => (
                        <ListGroup.Item
                          key={user.id}
                          className='d-flex justify-content-between align-items-center py-3'
                        >
                          <div>
                            <div className='fw-bold'>{user.userName}</div>
                            <div className='text-muted fs-7'>{user.phoneNumber}</div>
                          </div>
                          <Button
                            variant='light-danger'
                            className='btn btn-sm fw-bold btn-danger'
                            onClick={() => handleRemoveUser(user)}
                          >
                            <i className='fas fa-times'></i>
                          </Button>
                        </ListGroup.Item>
                      ))}
                      {selectedUsers.length === 0 && (
                        <ListGroup.Item className='text-center py-7 rounded'>
                          هیچ کاربری انتخاب نشده است
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default User;
