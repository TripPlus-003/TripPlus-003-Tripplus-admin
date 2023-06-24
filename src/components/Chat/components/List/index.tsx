import {
  Flex,
  Input,
  InputLeftElement,
  Icon,
  InputGroup,
  FlexProps,
  Text
} from '@chakra-ui/react';
import { ChatItem } from './components';
import { MdOutlineSearch } from 'react-icons/md';
import styles from './styles.module.css';
import ChatMenu from '../Menu';
import { useContext } from 'react';
import { AdminContext } from '@/components';

interface ChatListProps extends Omit<FlexProps, 'onClick'> {
  chatRooms: ApiMessages.MessageList[];
  onClick?: (arg: Messages.MessageSetting) => void;
}

export function ChatList({ chatRooms, onClick, ...rest }: ChatListProps) {
  const context = useContext(AdminContext);

  function renderChatItem(chatRoom: ApiMessages.MessageList) {
    const customer =
      chatRoom.message[0].receiver._id === context.id
        ? chatRoom.message[0].sender
        : chatRoom.message[0].receiver;

    return (
      <li
        key={chatRoom.customerId}
        onClick={() => {
          const roomId = {
            sender: context.id as string,
            receiver: chatRoom.customerId,
            roomId: chatRoom.message[0].roomId._id,
            name: customer.name
          };
          onClick?.(roomId);
        }}
      >
        <ChatItem
          name={customer.name}
          content={chatRoom.message[0].content}
          photo={customer.photo || undefined}
        />
      </li>
    );
  }

  return (
    <Flex
      px={3}
      py={4}
      flexDirection="column"
      overflowY="auto"
      borderLeftWidth="1px"
      borderLeftStyle="solid"
      borderLeftColor="gray.100"
      {...rest}
    >
      <Flex columnGap={2}>
        <InputGroup>
          <InputLeftElement pl={{ base: 5, lg: 3 }}>
            <Icon boxSize={5} color="gray.900" as={MdOutlineSearch} />
          </InputLeftElement>
          <Input
            mb={1}
            height="36px"
            variant="filled"
            placeholder="搜尋關鍵字"
            bg="gray.100"
          />
        </InputGroup>
        <ChatMenu />
      </Flex>
      {!chatRooms.length ? (
        <Text pt={{ base: 2 }} textAlign="center" flexGrow={1} w="full">
          尚未有人留言
        </Text>
      ) : (
        <ul className={styles['chat-list']}>{chatRooms.map(renderChatItem)}</ul>
      )}
    </Flex>
  );
}
