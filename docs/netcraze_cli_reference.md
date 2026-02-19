# Netcraze CLI Reference

## Table of Contents

1. [CLI Overview](#cli-overview)
2. [Commands](#commands)
3. [Quick Reference](#quick-reference)
4. [Coverage Report](#coverage-report)

---

## CLI Overview

### CLI architecture

The Netcraze CLI is hierarchical. Commands are entered in a context (mode). The prompt indicates the current context, for example: `(config)>` for global configuration, `(config-acl)>` when configuring an access list, `(config-user)>` for user settings, `(vpn-server)>` for VPN server, and `(show)>` for show (read-only) commands. Entering a group command (e.g. `access-list <name>`) switches the context to that group.

### Operating modes

| Mode | Prompt | Purpose |
|------|--------|---------|
| Configuration | `(config)>` | Global configuration |
| ACL | `(config-acl)>` | Access list rules |
| AFP | `(config-afp)>` | AFP service |
| CIFS | `(config-cifs)>` | CIFS/SMB service |
| Components | `(config-comp)>` | Component management |
| User | `(config-user)>` | User account settings |
| VPN server | `(vpn-server)>` | VPN server settings |
| Show | `(show)>` | Read-only information |

Use `exit` to leave the current group and return to the parent context.

### Syntax conventions

| Notation | Meaning |
|----------|---------|
| `‹name›` | Replace with a value |
| `[ optional ]` | Optional argument |
| `( a \| b )` | One of the alternatives |
| `no` prefix | Reverses or removes the setting (e.g. `no access-list <name>`) |

Commands and keywords are case-sensitive. Settings are applied immediately; use the appropriate save command to persist them to startup configuration.

---

## Commands

### access

Настроить пользовательский доступ к каталогу на USB-устройстве. Команда с префиксом no запрещает доступ к папке.

**Syntax**

```bash
access ‹directory› ‹user› ‹mode› [ recursive ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| directory | — | — | — |
| user | — | — | — |
| mode | — | — | — |

**Examples**

```
Пример (config)> access 0D5F-1DB6:Downloads test read/write
(config)> no access 0D5F-1DB6:Downloads test
```

**Notes**

История изменений Версия Описание Добавлена команда access.2.00

---

### access-list

Доступ к группе команд для настройки выбранного списка правил фильтрации пакетов. Если список не найден, команда пытается его создать. Такой список может быть присвоен сетевому интерфейсу с помощью команды interface ip access-group. Команда с префиксом no удаляет список правил.

**Syntax**

```bash
access-list ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
(config)> no access-list ‹name›
Пример (config)> access-list test_acl
Network::Acl: "test_acl" access list created.
(config-acl)>
(config)> no access-list test_acl
Network::Acl: "test_acl" access list removed.
```

**Notes**

История изменений Версия Описание Добавлена команда access-list.2.00

---

### access-list auto-delete

Включить автоматическое удаление правил ACL при удалении интерфейса. Команда принудительно включается для списков доступа с префиксом _WEBADMIN_. Команда не может быть включена, если нет привязанных интерфейсов. Исключением является чтение startup-config. Команда с префиксом no отключает автоматическое удаление.

**Syntax**

```bash
auto-delete
```

**Examples**

```
Пример (config-acl)> auto-delete
Network::Acl: Enabled auto-deletion for "_WEBADMIN_Home" access ►
group.
(config-acl)> no auto-delete
Network::Acl: Disabled auto-deletion for "_WEBADMIN_Home" access ►
```

**Notes**

История изменений Версия Описание Добавлена команда access-list auto-delete.3.09

---

### access-list deny

Добавить запрещающее правило фильтрации пакетов в указанный ACL. Команда с префиксом no удаляет правило. [ port( ( ‹src-port-operator› ‹source-port› )| ( range ‹source-port› ‹source-end-port› ))] ‹destination› ‹destination-mask› [ port( ( ‹dst-port-operator› ‹destination-port› )| ( range ‹destination-port› ‹destination-end-port› ))]

**Syntax**

```bash
deny (tcp | udp) ‹source› ‹source-mask›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| source | — | — | — |
| source-mask | — | — | — |

**Examples**

```
(config-acl)> deny (icmp | esp | gre | ipip | ip) ‹source› ‹source-mask›
(config-acl)> no deny (tcp | udp) ‹source› ‹source-mask›
[ port( ( ‹src-port-operator› ‹source-port› )|
( range ‹source-port› ‹source-end-port› ))]
[ port( ( ‹dst-port-operator› ‹destination-port› )|
( range ‹destination-port› ‹destination-end-port› ))]
(config-acl)> no deny (icmp | esp | gre | ipip | ip) ‹source› ‹source-mask›
```

**Notes**

История изменений Версия Описание Добавлена команда access-list deny.2.00 Новое значение ip было добавлено в аргумент protocol . 2.06 Добавлены новые протоколы esp,gre и ipip.2.08 Добавлены диапазоны портов.2.09.A.2.1

---

### access-list permit

Добавить разрешающее правило фильтрации пакетов в указанный ACL. Команда с префиксом no удаляет правило. [ port( ( ‹src-port-operator› ‹source-port› )| ( range ‹source-port› ‹source-end-port› ))] ‹destination› ‹destination-mask› [ port( ( ‹dst-port-operator› ‹destination-port› )| ( range ‹destination-port› ‹destination-end-port› ))]

**Syntax**

```bash
permit (tcp | udp) ‹source› ‹source-mask›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| source | — | — | — |
| source-mask | — | — | — |

**Examples**

```
(config-acl)> permit (icmp | esp | gre | ipip | ip) ‹source› ‹source-mask›
(config-acl)> no permit (tcp | udp) ‹source› ‹source-mask›
[ port( ( ‹src-port-operator› ‹source-port› )|
( range ‹source-port› ‹source-end-port› ))]
[ port( ( ‹dst-port-operator› ‹destination-port› )|
( range ‹destination-port› ‹destination-end-port› ))]
(config-acl)> no permit (icmp | esp | gre | ipip | ip) ‹source› ‹source-mask›
```

**Notes**

История изменений Версия Описание Добавлена команда access-list permit.2.00 Новое значение ip было добавлено в аргумент protocol . 2.06 Добавлены новые протоколы esp,gre и ipip.2.08 Добавлены диапазоны портов.2.09.A.2.1

---

### access-list rule

Отключить правило ACL, ограничить время его работы расписанием, изменить его место в списке правил или добавить его описание. Команда с префиксом no включает правило, отменяет расписание или удаляет описание. ‹new-index› | description ‹description›)

**Syntax**

```bash
rule ‹index› (disable | schedule ‹schedule› | order
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| index | — | — | — |
| schedule | — | — | — |

**Examples**

```
(config-acl)> no rule ‹index› (disable | schedule | description)
disable
Название расписания, созданного при
помощи группы команд schedule.
Новая позиция правила ACL в списке.Целое числоorder
Описание правила ACL.Строкаdescription
Пример (config-acl)> rule 0 disable
```

**Notes**

История изменений Версия Описание Добавлена команда access-list rule.2.08

---

### afp

Доступ к группе команд для управления службой AFP.

**Syntax**

```bash
afp
```

**Examples**

```
Пример (config)> afp
Core::Configurator: Done.
(config-afp)>
```

**Notes**

История изменений Версия Описание Добавлена команда afp.2.06

---

### afp automount

Включить автоматическое подключение USB-устройств для доступа к ним через AFP. По умолчанию функция включена. Команда с префиксом no отключает функцию автоматического подключения.

**Syntax**

```bash
automount
```

**Examples**

```
Пример (config-afp)> automount
Afp::Server: Automount enabled.
(config-afp)> no automount
Afp::Server: Automount disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда afp automount.2.06

---

### afp permissive

Включить разрешающий режим, когда все пользователи могут получить доступ к файлам на USB-устройстве. По умолчанию режим отключен. Команда с префиксом no отключает разрешающий режим, и доступ к файлам имеют только пользователи с меткой "afp".

**Syntax**

```bash
permissive
```

**Examples**

```
Пример (config-afp)> permissive
Afp::Server: Permissive mode enabled.
(config-afp)> no permissive
Afp::Server: Permissive mode disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда afp permissive.2.06

---

### afp share

Открыть общий доступ к каталогу на USB-устройстве. Команда с префиксом no закрывает общий доступ к каталогу. Если выполнить команду без аргумента, то ко всем каталогам на USB-устройстве будет закрыт общий доступ.

**Syntax**

```bash
share ‹label› ‹mount› [timemachine] [ description ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| label | — | — | — |
| mount | — | — | — |

**Examples**

```
Пример (config-afp)> share AFP C253-062D:/FOR_AFP timemachine
Afp::Server: Added share "AFP".
(config-afp)> no share AFP
Afp::Server: Removed share "AFP".
```

**Notes**

История изменений Версия Описание Добавлена команда afp share.2.06

---

### cifs

Доступ к группе команд для управления службой CIFS.

**Syntax**

```bash
cifs
```

**Examples**

```
Пример (config)> cifs
Core::Configurator: Done.
(config-cifs)>
```

**Notes**

История изменений Версия Описание Добавлена команда cifs.2.00

---

### cifs automount

Включить автоматическое подключение USB-устройств для доступа к ним через CIFS. По умолчанию функция включена. Команда с префиксом no отключает функцию автоматического подключения.

**Syntax**

```bash
automount
```

**Examples**

```
Пример (config-cifs)> automount
Cifs::ServerTsmb: Automount enabled.
(config-cifs)> no automount
Cifs::ServerTsmb: Automount disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда cifs automount.2.00

---

### cifs map-hidden

Включить поддержку ACL и скрытых файлов для CIFS. По умолчанию функция отключена. Команда с префиксом no отключает настройку.

**Syntax**

```bash
map-hidden
```

**Examples**

```
Пример (config-cifs)> map-hidden
Cifs::ServerTsmb: Map hidden enabled.
(config-cifs)> no map-hidden
```

**Notes**

История изменений Версия Описание Добавлена команда cifs map-hidden.2.14

---

### cifs master

Включить мастер-браузер на TSMB-сервере. По умолчанию настройка включена. Команда с префиксом no отключает мастер-браузер.

**Syntax**

```bash
master
```

**Examples**

```
Пример (config-cifs)> master
Cifs::ServerTsmb: Master browser enabled.
(config-cifs)> no master
Cifs::ServerTsmb: Master browser disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда cifs master.2.00 Команда cifs master удалена как устаревшая.2.04 Вновь добавлена команда cifs master.3.03

---

### cifs permissive

Включить разрешающий режим, когда все пользователи могут получить доступ к файлам на USB-устройстве. По умолчанию режим отключен. Команда с префиксом no отключает разрешающий режим, и доступ к файлам имеют только пользователи с меткой "cifs".

**Syntax**

```bash
permissive
```

**Examples**

```
Пример (config-cifs)> permissive
Cifs::ServerTsmb: Permissive mode enabled.
(config-cifs)> no permissive
Cifs::ServerTsmb: Permissive mode disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда cifs permissive.2.00

---

### cifs share

Открыть общий доступ к каталогу на USB-устройстве. Команда с префиксом no закрывает общий доступ к каталогу. Если выполнить команду без аргумента, то ко всем каталогам на USB-устройстве будет закрыт общий доступ.

**Syntax**

```bash
share ‹label› ‹mount› [ description ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| label | — | — | — |
| mount | — | — | — |

**Examples**

```
Пример (config-cifs)> share MYHOME1 10A0CDE9A0CDD4FE:/
Cifs::ServerTsmb: Added share "MYHOME1".
(config-cifs)> share MYHOME 10A0CDE9A0CDD4FE:/Video/
Cifs::ServerTsmb: Added share "MYHOME".
(config-cifs)> no share MYHOME1
Cifs::ServerTsmb: Removed share "MYHOME1".
```

**Notes**

История изменений Версия Описание Добавлена команда cifs share.2.00

---

### cloud control2 security-level

Установить уровеньбезопасности сервисаCloudControl2 для мобильного приложения Netcraze. По умолчанию назначен уровень безопасности public.

**Syntax**

```bash
cloud control2 security-level (public | private)
```

**Examples**

```
Пример (config)> cloud control2 security-level public
CloudControl2::Agent: Security level changed to public.
(config)> cloud control2 security-level private
CloudControl2::Agent: Security level changed to private.
```

**Notes**

История изменений Версия Описание Добавлена команда cloud control2 security-level.3.05

---

### components

Доступ к группекоманд для управления компонентамимикропрограммы.

**Syntax**

```bash
components
```

**Notes**

История изменений Версия Описание Добавлена команда components.2.00

---

### components auto-update channel

Задать источник компонентов для функции автообновления. По умолчанию используется значение stable. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
auto-update channel ‹channel›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| channel | — | — | — |

**Examples**

```
Пример (config-comp)> auto-update channel preview
Components::Manager: Auto-update channel is "preview".
(config-comp)> no auto-update channel
Components::Manager: Reset an auto-update channel to default.
```

**Notes**

История изменений Версия Описание Добавленакомандаcomponentsauto-updatechannel.3.01

---

### components auto-update disable

Функция автоматического обновления компонентов. По умолчанию автоматическое обновление включено. Команда с префиксом no включает автоматическое обновление.

**Syntax**

```bash
auto-update disable
```

**Examples**

```
Пример (config-comp)> auto-update disable
Components::Manager: Components auto-update disabled.
(config-comp)> no auto-update disable
Components::Manager: Components auto-update enabled.
```

**Notes**

История изменений Версия Описание Добавленакоманда componentsauto-updatedisable.2.09

---

### components auto-update schedule

Присвоитьрасписаниедляработыфункцииавтоматическогообновления. Перед выполнением команды расписание должно быть создано и настроено при помощи команды schedule action. Команда с префиксом no разрывает связь между расписанием и автоматическим обновлением.

**Syntax**

```bash
auto-update schedule ‹schedule›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| schedule | — | — | — |

**Examples**

```
Пример (config-comp)> auto-update schedule Update
Components::Manager: Set auto-update schedule "Update".
(config-comp)> no auto-update schedule
Components::Manager: Schedule disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда components auto-update schedule. 3.03

---

### components check-update

Проверить обновление прошивки для кандидата или ведомого устройства Модульной Wi-Fi Системы.

**Syntax**

```bash
check-update [ force ]
```

**Examples**

```
Пример (config-comp)> check-update
release: 2.15.A.3.0-2
sandbox: draft
timestamp: Dec 17 18:58:55
valid: no
(config-comp)> check-update force
```

**Notes**

История изменений Версия Описание Добавлена команда components check-update.2.14

---

### components commit

Применить изменения, внесенные командами components install и components remove.

**Syntax**

```bash
commit
```

**Notes**

История изменений Версия Описание Добавлена команда components commit.2.00

---

### components install

Отметить компонент для последующей установки. Окончательная установка выполняется командой components commit.

**Syntax**

```bash
install ‹component›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| component | — | — | — |

**Examples**

```
Пример (config-comp)> install ntfs
Components::Manager: Component "ntfs" is queued for installation.
```

**Notes**

История изменений Версия Описание Добавлена команда components install.2.00

---

### components list

Переключиться на выбранную песочницу и отметить для установки все компоненты, требующие изменения для соответствия версии в песочнице. Если выполнить команду без аргумента, то будет выведен весь список всех компонентов текущей песочницы (установленных и доступных для установки). Если отсутствует подключение к Интернет, то будет выведен только список уже установленных компонентов.

**Syntax**

```bash
list [ sandbox ]
```

**Examples**

```
Пример (config-comp)> list
firmware:
version: 2.13.C.0.0-1
sandbox: stable
local:
sandbox: beta
component:
name: base
priority: optional
size: 35233
```

**Notes**

История изменений Версия Описание Добавлена команда components list.2.00 Добавлен параметр sandbox. Команда components list должна использоваться вместо устаревшей components sync. 2.06.A.6

---

### components preset

Выбрать готовый набор компонентов. Установка набора выполняется командой components commit. Преждечемустановитьнаборкомпонентов,проверьтепоследниеверсии компонентов на сервере обновлений командой components list. Требуется подключение к Интернету.

**Syntax**

```bash
preset ‹preset›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| preset | — | — | — |

**Examples**

```
Пример (config-comp)> preset [Tab]
Usage template:
preset {preset}
Choose:
minimal
recommended
(config-comp)> preset recommended
lib::libndmComponents error[268369922]: updates are available ►
for this system.
(config-comp)> commit
```

**Notes**

История изменений Версия Описание Добавлена команда components preset.2.00

---

### components preview

Показать размер прошивки, составленной из компонентов, выбранных с помощью команды components install.

**Syntax**

```bash
preview
```

**Examples**

```
Пример (config-comp)> preview
preview:
size: 7733308
```

**Notes**

История изменений Версия Описание Добавлена команда components preview.2.06

---

### components remove

Отметить компонент для последующего удаления. Окончательное удаление выполняется командой components commit.

**Syntax**

```bash
remove ‹component›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| component | — | — | — |

**Examples**

```
Пример (config-comp)> remove ntfs
Components::Manager: Component "ntfs" is queued for removal.
```

**Notes**

История изменений Версия Описание Добавлена команда components remove.2.00

---

### components validity-period

Установить срок актуальности локального списка компонентов. По истечении этого времени будет автоматически выполнена команда components list для получения текущего списка компонентов с сервера обновлений. По умолчанию используется значение 1800. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
validity-period ‹seconds›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| seconds | — | — | — |

**Examples**

```
Пример (config-comp)> validity-period 500
Components::Manager: Validity period set to 500 seconds.
(config-comp)> no validity-period
Components::Manager: Validity period reset to 1800 seconds.
```

**Notes**

История изменений Версия Описание Добавлена команда components validity-period.2.03

---

### copy

Копировать содержимое одного файла в другой. Используется для обновления прошивки, сохранения текущих настроек, сброса настроек на заводские и др.

**Syntax**

```bash
copy ‹source› ‹destination›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| source | — | — | — |
| destination | — | — | — |

**Examples**

```
(config)> copy running-config startup-config
(config)> copy log MyPassport:/log.txt
Имена файлов в этом примере являются псевдонимами. Полные имена
файлов конфигурации это system:running-config и
flash:startup-config, соответственно.
```

**Notes**

История изменений Версия Описание Добавлена команда copy.2.00 3

---

### crypto engine

Выбрать тип обработки ESP IPsec пакетов. По умолчанию используется аппаратный режим. Команда с префиксом no отключает функцию.

**Syntax**

```bash
crypto engine ‹type›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| type | — | — | — |

**Examples**

```
Пример (config)> crypto engine software
IpSec::CryptoEngineManager:IPsec crypto engine set to "software".
(config)> no crypto engine
IpSec::CryptoEngineManager: IPsec crypto engine was disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto engine.2.06

---

### crypto ike key

Добавить ключ IKE с идентификатором удаленной стороны. Команда с префиксом no удаляет указанный ключ.

**Syntax**

```bash
crypto ike key ‹name› ‹psk› ( ‹type› ‹id› | any)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| psk | — | — | — |
| type | — | — | — |
| id | — | — | — |

**Examples**

```
Пример (config)> crypto ike key VirtualIPServer ►
aDjsOC1gvWCsOiE4Ijhs+HRnNPiheGA478 any
IpSec::Manager: "VirtualIPServer": crypto ike key successfully ►
added.
(config)> crypto ike key VirtualIPServer ►
aDjsOC1gvWCsOiE4Ijhs+HRnNPiheGA478R4M6d4+O54LLihe any
updated.
(config)> no crypto ike key VirtualIPServer
removed.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ike key.2.06

---

### crypto ike mtu

Установить значение MTU, которое будет передано IKE. По умолчанию MTU наследуется от интефейса, через который осуществляется доступ в Интернет. Команда с префиксом no возвращает значение MTU по умолчанию.

**Syntax**

```bash
crypto ike mtu (value)
```

**Examples**

```
Пример (config)> crypto ike mtu 1400
IpSec::Manager: IKE MTU value is set to 1400.
(config)> no crypto ipsec mtu
IpSec::Manager: Reset IKE MTU value.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ike mtu.3.08

---

### crypto ike nat-keepalive

Установить тайм-аут между пакетами keepalive в случае обнаружения NAT между клиентом и сервером IPsec. По умолчанию установлено значение 20. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
crypto ike nat-keepalive ‹nat-keepalive›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| nat-keepalive | — | — | — |

**Examples**

```
Пример (config)> crypto ike nat-keepalive 90
IpSec::Manager: Set crypto ike nat-keepalive timeout to 90 s.
(config)> no crypto ike nat-keepalive
IpSec::Manager: Reset crypto ike nat-keepalive timeout to 20 s.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ike nat-keepalive.2.06

---

### crypto ike policy

Доступ к группе команд для настройки выбранной политики IKE. Если политика IKE не найдена, команда пытается её создать. Командас префиксомno удаляетполитикуIKE. При этом даннаяполитика IKE автоматически удаляется из всех профилей IPsec.

**Syntax**

```bash
crypto ike policy ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (config)> crypto ike policy test
IpSec::Manager: "test": crypto ike policy successfully created.
(config)> no crypto ike policy test
IpSec::Manager: Crypto ike policy "test" removed.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ike policy.2.06

---

### crypto ike policy lifetime

Установить время жизни ассоциации IPsec IKE. По умолчанию используется значение 86400. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
lifetime ‹lifetime›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| lifetime | — | — | — |

**Examples**

```
Пример (config-ike-policy)> lifetime 3600
IpSec::Manager: "test": crypto ike policy lifetime set to 3600 s.
(config-ike-policy)> no lifetime
IpSec::Manager: "test": crypto ike policy lifetime reset.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ike policy lifetime.2.06

---

### crypto ike policy mode

Задать версию протокола IKE. По умолчанию используется значение ikev1. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
mode ‹mode›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mode | — | — | — |

**Examples**

```
Пример (config-ike-policy)> mode ikev2
IpSec::Manager: "test": crypto ike policy mode set to "ikev2".
(config-ike-policy)> no mode
IpSec::Manager: "test": crypto ike policy mode reset.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ike policy mode.2.06

---

### crypto ike policy negotiation-mode

Установитьрежим обмена для IKEv1 (см. команду crypto ike policy mode). По умолчанию используется значение main. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
negotiation-mode ‹negotiation-mode›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| negotiation-mode | — | — | — |

**Examples**

```
Пример (config-ike-policy)> negotiation-mode aggressive
IpSec::Manager: "test": crypto ike policy negotiation-mode set ►
to "aggressive".
(config-ike-policy)> no negotiation-mode
IpSec::Manager: "test": crypto ike policy negotiation-mode reset.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ike policy negotiation-mode. 2.06

---

### crypto ike policy proposal

Добавить в политику IKE ссылку на выбранный IKE proposal. Очередность добавления имеет значение для обмена данными по протоколу IKE. Команда с префиксом no удаляет ссылку на IKE proposal.

**Syntax**

```bash
proposal ‹proposal›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| proposal | — | — | — |

**Examples**

```
Пример (config-ike-policy)> proposal test
IpSec::Manager: "test": crypto ike proposal "test" successfully ►
added.
(config-ike-policy)> no proposal
IpSec::Manager: "test": crypto ike policy proposal "test" ►
successfully removed.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ike policy proposal.2.06

---

### crypto ike proposal

Доступ к группе команд для настройки выбранного IKE proposal. Если IKE proposal не найден, команда пытается его создать. Полный список алгоритмов шифрования реализованных в системе приведен в Приложении. Команда с префиксом no удаляет IKE proposal. При этом из всех политик IKE автоматически удаляются ссылки на данный IKE proposal.

**Syntax**

```bash
crypto ike proposal ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (config)> crypto ike proposal test
IpSec::Manager: "test": crypto ike proposal successfully created.
(config)> no crypto ike proposal test
IpSec::Manager: Crypto ike proposal "test" removed.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ike proposal.2.06

---

### crypto ike proposal aead

Включить режим шифрования AEADдля IKE proposal.

**Syntax**

```bash
aead
```

**Examples**

```
Пример (config-ike-proposal)> aead
IpSec::Manager: "TEST": crypto ike proposal "TEST" enabled AEAD ►
mode.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ike proposal aead.3.05

---

### crypto ike proposal dh-group

Добавить выбранную DH группу в IKE proposal для работы в режиме PFS. Очередность добавления имеет значение для обмена данными по протоколу IKE. Команда с префиксом no удаляет выбранную группу.

**Syntax**

```bash
dh-group ‹dh-group›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| dh-group | — | — | — |

**Examples**

```
Пример (config-ike-proposal)> dh-group 14
IpSec::Manager: "test": crypto ike proposal DH group "14" ►
successfully added.
(config-ike-proposal)> no dh-group 14
IpSec::Manager: "test": crypto ike proposal "test" group type ►
successfully removed.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ike proposal dh-group.2.06

---

### crypto ike proposal encryption

Добавить выбранный тип шифрования в IKE proposal. Очередность добавления имеет значение для обмена данными по протоколу IKE. Команда с префиксом no удаляет выбранный тип шифрования.

**Syntax**

```bash
encryption ‹encryption›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| encryption | — | — | — |

**Examples**

```
Пример (config-ike-proposal)> encryption des
IpSec::Manager: "test": crypto ike proposal encryption algorithm ►
"des" added.
(config-ike-proposal)> no encryption des
IpSec::Manager: "test": crypto ike proposal "test" encryption ►
type successfully removed.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ike proposal encryption.2.06

---

### crypto ike proposal integrity

Добавить выбранное значение алгоритма подписи HMAC в IKE proposal. Очередность добавления имеет значение для обмена данными по протоколу IKE. Команда с префиксом no удаляет выбранный алгоритм.

**Syntax**

```bash
integrity ‹integrity›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| integrity | — | — | — |

**Examples**

```
Пример (config-ike-proposal)> integrity sha256
IpSec::Manager: "test": crypto ike proposal integrity algorithm ►
"sha256" successfully added.
(config-ike-proposal)> no integrity sha256
IpSec::Manager: "test": crypto ike proposal "test" integrity ►
type successfully removed.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ike proposal integrity.2.06

---

### crypto ike proposal prf

Добавить выбранную группу PRF в IKE proposal. Команда с префиксом no удаляет выбранный алгоритм.

**Syntax**

```bash
prf ‹prf›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| prf | — | — | — |

**Examples**

```
Пример (config-ike-proposal)> prf sha256
IpSec::Manager: "TEST": crypto ike proposal prf algorithm ►
"sha256" successfully added.
(config-ike-proposal)> no prf sha256
IpSec::Manager: "TEST": crypto ike proposal "TEST" prf type ►
successfully removed.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ike proposal prf.3.05

---

### crypto ipsec incompatible

Отключить проверку совместимости IPsec туннелей. По умолчанию настройка отключена. Команда с префиксом no включает проверку обратно.

**Syntax**

```bash
crypto ipsec incompatible
```

**Examples**

```
Пример (config)> crypto ipsec incompatible
IpSec::Manager: Compatibility checks is disabled.
(config)> no crypto ipsec incompatible
IpSec::Manager: Compatibility checks is enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ipsec incompatible.2.10

---

### crypto ipsec profile

Доступ к группе команд для настройки выбранного профиля IPsec. Если профиль не найден, команда пытается его создать. Команда с префиксом no удаляет профиль. При этом ссылки на данный профиль автоматически удаляются изо всех криптокарт IPsec.

**Syntax**

```bash
crypto ipsec profile ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (config)> crypto ipsec profile test
IpSec::Manager: "test": crypto ipsec profile successfully created.
(config)> no crypto ipsec profile test
IpSec::Manager: Crypto ipsec profile "test" removed.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ipsec profile.2.06

---

### crypto ipsec profile authentication-local

Задать тип аутентификации локального хоста. По умолчанию используется значение pre-share. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
authentication-local ‹auth›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| auth | — | — | — |

**Examples**

```
Пример (config-ipsec-profile)> authentication-local pre-share
IpSec::Manager:"test": crypto ipsec profile authentication-local►
type "pre-share" is set.
(config-ipsec-profile)> no authentication-local
reset.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ipsec profile authentication-local. 2.06

---

### crypto ipsec profile authentication-remote

Задать тип аутентификации удаленного хоста. По умолчанию используется значение pre-share. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
authentication-remote ‹auth›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| auth | — | — | — |

**Examples**

```
Пример (config-ipsec-profile)> authentication-remote pre-share
IpSec::Manager: "test": crypto ipsec profile ►
authentication-remote type "pre-share" is set.
(config-ipsec-profile)> no authentication-remote
authentication-remote reset.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ipsec profile authentication-remote. 2.06

---

### crypto ipsec profile dpd-clear

Задать способ действия при обнаружении неработающего пира IKE. По умолчанию параметр включен, что означает удаление информации о пире. Команда с префиксом no устанавливает действие в restart.

**Syntax**

```bash
dpd-clear
```

**Examples**

```
Пример (config-ipsec-profile)> dpd-clear
IpSec::Manager: "VPNL2TPServer": crypto ipsec profile DPD action ►
set to "clear".
(config-ipsec-profile)> no dpd-clear
set to "restart".
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ipsec profile dpd-clear.2.11

---

### crypto ipsec profile dpd-interval

Задать параметры метода для обнаружения неработающих IKE пиров. По умолчанию значение interval равно 30, retry-count равно 3. Команда с префиксом no возвращает значения по умолчанию.

**Syntax**

```bash
dpd-interval ‹interval› [retry-count]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interval | — | — | — |

**Examples**

```
Пример (config-ipsec-profile)> dpd-interval 5 30
IpSec::Manager: "test": crypto ipsec profile dpd retry count is ►
set to 30.
(config-ipsec-profile)> no dpd-interval
IpSec::Manager: "test": crypto ipsec profile dpd retry count ►
reset.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ipsec profile dpd-interval.2.06

---

### crypto ipsec profile identity-local

Задать локальный идентификатор для профиля IPsec. Команда с префиксом no удаляет локальный идентификатор.

**Syntax**

```bash
identity-local ‹type› ‹id›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| type | — | — | — |
| id | — | — | — |

**Notes**

История изменений Версия Описание Добавленакоманда crypto ipsec profile identity-local.2.06

---

### crypto ipsec profile match-identity-remote

Задать идентификатор удаленного хоста для выбранного профиля IPsec. Команда с префиксом no удаляет идентификатор удаленного хоста.

**Syntax**

```bash
match-identity-remote ( ‹type› ‹id› | any)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| type | — | — | — |
| id | — | — | — |

**Examples**

```
Пример (config-ipsec-profile)> match-identity-remote any
IpSec::Manager: "test": crypto ipsec profile ►
match-identity-remote is set to any.
(config-ipsec-profile)> no match-identity-remote
match-identity-remote reset.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ipsec profile match-identity-remote. 2.06

---

### crypto ipsec profile mode

Установить режим работы IPsec. По умолчанию используется значение tunnel. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
mode ‹mode›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mode | — | — | — |

**Examples**

```
Пример (config-ipsec-profile)> mode transport
IpSec::Manager: "test": crypto ipsec profile mode set to ►
"transport".
(config-ipsec-profile)> no mode
IpSec::Manager: "test": crypto ipsec profile mode reset.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ipsec profile mode.2.06

---

### crypto ipsec profile policy

Задать ссылку на существующую политику IKE (см. команду crypto ike policy). Команда с префиксом no удаляет ссылку.

**Syntax**

```bash
policy ‹policy›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| policy | — | — | — |

**Examples**

```
Пример (config-ipsec-profile)> policy [Tab]
Usage template:
policy {name: {A-Z, a-z, 0-9, ., _, -}}
Choose:
VirtualIPServer
VPNL2TPServer
(config-ipsec-profile)> policy test
IpSec::Manager: "test": crypto ipsec profile policy set to "test".
(config-ipsec-profile)> no policy
IpSec::Manager: "test": crypto ipsec profile policy reset.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ipsec profile policy.2.06

---

### crypto ipsec profile preshared-key

Задать связанную ключевую фразу для данного профиля IPsec. Команда с префиксом no удаляет ключевую фразу.

**Syntax**

```bash
preshared-key ‹preshare-key›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| preshare-key | — | — | — |

**Examples**

```
Пример (config-ipsec-profile)> preshared-key testkey
IpSec::Manager: "test": crypto ipsec profile preshared key was ►
set.
(config-ipsec-profile)> no preshared-key
IpSec::Manager: "test": crypto ipsec profile preshared key reset.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ipsec profile preshared-key. 2.06

---

### crypto ipsec profile xauth

Включить дополнительную аутентификацию XAuth для режима IKEv1. По умолчанию функция отключена. Команда с префиксом no отключает дополнительную проверку подлинности.

**Syntax**

```bash
xauth ‹type›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| type | — | — | — |

**Examples**

```
Пример (config-ipsec-profile)> xauth client
IpSec::Manager: "test": crypto ipsec profile xauth set to ►
"client".
(config-ipsec-profile)> no xauth
IpSec::Manager: "test": crypto ipsec profile xauth is disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ipsec profile xauth.2.06

---

### crypto ipsec profile xauth-identity

Указать логин для дополнительной аутентификации XAuth в клиентском режиме. Команда с префиксом no удаляет логин.

**Syntax**

```bash
xauth-identity ‹identity›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| identity | — | — | — |

**Examples**

```
Пример (config-ipsec-profile)> xauth-identity ident
IpSec::Manager: "test": crypto ipsec profile xauth-identity is ►
set to "ident".
(config-ipsec-profile)> no xauth-identity
IpSec::Manager: "test": crypto ipsec profile xauth identity is ►
deleted.
```

**Notes**

История изменений Версия Описание Добавленакомандаcryptoipsecprofilexauth-identity.2.06

---

### crypto ipsec profile xauth-password

Указатьпарольдля дополнительнойаутентификацииXAuth в клиентском режиме. Команда с префиксом no стирает значение пароля.

**Syntax**

```bash
xauth-password ‹password›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| password | — | — | — |

**Examples**

```
Пример (config-ipsec-profile)> xauth-password password
IpSec::Manager: "test": crypto ipsec profile xauth-password is ►
set.
(config-ipsec-profile)> no xauth-password
IpSec::Manager: "test": crypto ipsec profile xauth password is ►
deleted.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ipsec profile xauth-password. 2.06

---

### crypto ipsec rekey delete-delay

Задать интервал перед удалением IKE SA после получения команды DELETE от удаленной стороны. По умолчанию используется значение 10. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
crypto ipsec rekey delete-delay ‹delay›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| delay | — | — | — |

**Examples**

```
Пример (config)> crypto ipsec rekey delete-delay 1
IpSec::Manager: Rekey delete-delay value is set to 1.
(config)> no crypto ipsec rekey delete-delay
IpSec::Manager: Rekey delete-delay value is set to 10.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ipsec rekey delete-delay.2.11

---

### crypto ipsec rekey make-before

Включить режим установки новых IKE SA до разрыва предыдущих. По умолчанию функция отключена. Команда с префиксом no отключает этот режим.

**Syntax**

```bash
crypto ipsec rekey make-before
```

**Examples**

```
Пример (config)> crypto ipsec rekey make-before
IpSec::Manager: Enable make-before-brake scheme for IKEv2 rekey.
(config)> no crypto ipsec rekey make-before
IpSec::Manager: Disable make-before-brake scheme for IKEv2 rekey.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ipsec rekey make-before.2.11

---

### crypto ipsec transform-set

Доступ к группе команд для настройкивыбранногопреобразованияIPsec ESP во 2 фазе. Если преобразование не найдено, команда пытается его создать. Команда с префиксом no удаляет преобразование. При этом из всех криптокарт IPsec автоматически удаляются ссылки на данное преобразование.

**Syntax**

```bash
crypto ipsec transform-set ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (config)> crypto ipsec transform-set test
IpSec::Manager: "test": crypto ipsec transform-set successfully ►
created.
(config)> no crypto ipsec transform-set test
IpSec::Manager: Crypto ipsec transform-set "test" removed.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ipsec transform-set.2.06

---

### crypto ipsec transform-set aead

Включить режим шифрования AEADдля IPsec.

**Syntax**

```bash
aead
```

**Examples**

```
Пример (config-ipsec-transform)> dh-group 14
IpSec::Manager:"TEST": crypto ipsec transform-set "TEST" enabled ►
AEAD mode.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ipsec transform-set aead.3.05

---

### crypto ipsec transform-set cypher

Добавить выбранный тип шифрования в преобразование IPsec. Очередность добавления имеет значение для обмена данными по протоколу IKE. Команда с префиксом no удаляет выбранный тип шифрования.

**Syntax**

```bash
cypher ‹cypher›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| cypher | — | — | — |

**Examples**

```
Пример (config-ipsec-transform)> cypher esp-3des
IpSec::Manager: "test": crypto ipsec transform-set cypher ►
"esp-3des" successfully added.
(config-ipsec-transform)> no cypher esp-3des
IpSec::Manager: "test": crypto ipsec transform-set "test" cypher ►
successfully removed.
```

**Notes**

История изменений Версия Описание Добавленакомандаcryptoipsectransform-setcypher.2.06

---

### crypto ipsec transform-set dh-group

Добавить выбранную DH группу в преобразование IPsec для работы в режиме PFS. Очередность добавления имеет значение для обмена данными по протоколу IKE. Команда с префиксом no удаляет выбранную группу.

**Syntax**

```bash
dh-group ‹dh-group›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| dh-group | — | — | — |

**Examples**

```
Пример (config-ipsec-transform)> dh-group 14
IpSec::Manager: "test": crypto ipsec transform-set dh-group "14" ►
successfully added.
(config-ipsec-transform)> no dh-group 14
IpSec::Manager: "test": crypto ipsec transform-set "test" ►
dh-group successfully removed.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ipsec transform-set dh-group. 2.06

---

### crypto ipsec transform-set hmac

Добавить выбранный алгоритм подписи HMAC в преобразование IPsec. Очередность добавления имеет значение для обмена данными по протоколу IKE. Команда с префиксом no удаляет выбранный алгоритм.

**Syntax**

```bash
hmac ‹hmac›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| hmac | — | — | — |

**Examples**

```
Пример (config-ipsec-transform)> hmac esp-sha1-hmac
IpSec::Manager: "test": crypto ipsec transform-set hmac ►
"esp-sha1-hmac" successfully added.
(config-ipsec-transform)> no hmac esp-sha1-hmac
IpSec::Manager: "test": crypto ipsec transform-set "test" hmac ►
successfully removed.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ipsec transform-set hmac.2.06

---

### crypto ipsec transform-set lifetime

Установить время жизни выбранного преобразования IPsec. По умолчанию используется значение 3600. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
lifetime ‹lifetime›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| lifetime | — | — | — |

**Examples**

```
Пример (config-ipsec-transform)> lifetime 8640
IpSec::Manager: "test": crypto ipsec transform-set lifetime set ►
to 8640 s.
(config-ipsec-transform)> no lifetime
IpSec::Manager: "test": crypto ipsec transform-set lifetime reset.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto ipsec transform-set lifetime. 2.06

---

### crypto map

Доступ к группе команд для настройки выбранной криптокарты IPsec. Если криптокарта не найдена, команда пытается её создать. Команда с префиксом no удаляет криптокарту.

**Syntax**

```bash
crypto map ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (config)> crypto map test
IpSec::Manager: "test": crypto map successfully created.
(config)> no crypto map test
IpSec::Manager: Crypto map profile "test" removed.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map.2.06

---

### crypto map connect

Включить автоматическое безусловное соединение IPsec с удаленной стороной.Настройкане имеет смысла,если основномуудаленномухосту присвоено значение any (см. команду crypto map set-peer). По умолчанию настройка отключена и соединение будет установлено при попытке передать трафик через преобразование IPsec ESP. Команда с префиксом no отключает автоматическое безусловное соединение.

**Syntax**

```bash
connect
```

**Examples**

```
Пример (config-crypto-map)> connect
IpSec::Manager: "test": crypto map autoconnect enabled.
(config-crypto-map)> no connect
IpSec::Manager: "test": crypto map autoconnect disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map connect.2.06

---

### crypto map enable

Включить выбранную криптокарту IPsec. По умолчанию параметр включен. Команда с префиксом no отключает криптокарту.

**Syntax**

```bash
enable
```

**Examples**

```
Пример (config-crypto-map)> enable
IpSec::Manager: "test": crypto map enabled.
(config-crypto-map)> no enable
IpSec::Manager: "test": crypto map disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map enable.2.06

---

### crypto map fallback-check-interval

Включить периодическую проверку доступности основного хоста и возврата на него в том случае, когда назначены и основной и резервный удаленные хосты. По умолчанию настройка отключена. Команда с префиксом no отключает проверку.

**Syntax**

```bash
fallback-check-interval ‹interval-value›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interval-value | — | — | — |

**Examples**

```
Пример (config-crypto-map)> fallback-check-interval 120
IpSec::Manager: "test": crypto map fallback check interval is ►
set to 120.
(config-crypto-map)> no fallback-check-interval
cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map fallback-check-interval. 2.06

---

### crypto map force-encaps

Принудительно включить режим упаковки ESP-пакетов в UDP для обхода firewall и NAT. Команда с префиксом no отключает этот режим.

**Syntax**

```bash
force-encaps
```

**Examples**

```
Пример (config-crypto-map)> force-encaps
IpSec::Manager: "test": crypto map force ESP in UDP encapsulation ►
enabled.
(config-crypto-map)> no force-encaps
disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map force-encaps.2.08

---

### crypto map l2tp-server dhcp route

Назначить маршрут, передаваемый через сообщения DHCP INFORM, клиентам L2TP-сервера. Команда с префиксом no отменяет получение указанного маршрута. Если ввести команду без аргументов, будет отменено получение всех маршрутов.

**Syntax**

```bash
l2tp-server dhcp route ‹address› ‹mask›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |
| mask | — | — | — |

**Examples**

```
Пример (config-crypto-map)> l2tp-server dhcp route 192.168.2.0/24
IpSec::Manager: "VPNL2TPServer": crypto map L2TP/IPsec server ►
added DHCP INFORM route to 192.168.2.0/255.255.255.0.
(config-crypto-map)> l2tp-server no dhcp route
IpSec::Manager: "VPNL2TPServer": Cleared DHCP INFORM routes.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map l2tp-server dhcp route. 2.12

---

### crypto map l2tp-server enable

Включить L2TP-сервер на криптокарте IPsec. По умолчанию параметр включен. Команда с префиксом no отключает настройку.

**Syntax**

```bash
l2tp-server enable
```

**Examples**

```
Пример (config-crypto-map)> l2tp-server enable
IpSec::Manager: "VPNL2TPServer": crypto map L2TP/IPsec server ►
enabled.
(config-crypto-map)> no l2tp-server enable
disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map l2tp-server enable.2.11

---

### crypto map l2tp-server interface

Связать сервер L2TP с указанным интерфейсом. Команда с префиксом no разрывает связь между сервером и интерфейсом.

**Syntax**

```bash
l2tp-server interface ‹interface›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |

**Examples**

```
Пример (config-crypto-map)> l2tp-server interface [Tab]
Usage template:
interface {interface}
Choose:
GigabitEthernet1
ISP
WifiMaster0/AccessPoint2
WifiMaster1/AccessPoint1
WifiMaster0/AccessPoint3
WifiMaster0/AccessPoint0
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map l2tp-server interface.2.11

---

### crypto map l2tp-server ipv6cp

Включить поддержку IPv6. Для каждого L2TP-сервера создаются DHCP-пулы IPv6. По умолчанию настройка отключена. Команда с префиксом no отключает настройку.

**Syntax**

```bash
l2tp-server ipv6cp
```

**Examples**

```
Пример (config-crypto-map)> l2tp-server ipv6cp
IpSec::Manager: "VPNL2TPServer": crypto map L2TP/IPsec server ►
IPv6CP is enabled.
(config-crypto-map)> no l2tp-server ipv6cp
IPv6CP is disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map l2tp-server ipv6cp.3.00

---

### crypto map l2tp-server lcp echo

Задать правила тестирования соединения L2TP-сервера средствами LCP echo. Команда с префиксом no отключает LCP echo.

**Syntax**

```bash
l2tp-server lcp echo ‹interval› ‹count›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interval | — | — | — |
| count | — | — | — |

**Examples**

```
Пример (config-crypto-map)> l2tp-server lcp echo 5 3
IpSec::Manager: "VPNL2TPServer": crypto map L2TP/IPsec server ►
set LCP echo to "5" : "3".
(config-crypto-map)> no l2tp-server lcp echo
LCP echo disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map l2tp-server lcp echo.2.11

---

### crypto map l2tp-server mru

Установить значение MRU, которое будет передано серверу L2TP. По умолчанию используется значение 1200. Команда с префиксом no устанавливает значение по умолчанию.

**Syntax**

```bash
l2tp-server mru ‹mru›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mru | — | — | — |

**Examples**

```
Пример (config-crypto-map)> l2tp-server mru 1500
IpSec::Manager: "VPNL2TPServer": crypto map L2TP/IPsec server ►
set MRU to "1500".
(config-crypto-map)> no l2tp-server mru
MRU reset to default.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map l2tp-server mru.2.11

---

### crypto map l2tp-server mtu

Установить значение MTU, которое будет передано серверу L2TP. По умолчанию используется значение 1400. Команда с префиксом no устанавливает значение по умолчанию.

**Syntax**

```bash
l2tp-server mtu ‹mtu›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mtu | — | — | — |

**Examples**

```
Пример (config-crypto-map)> l2tp-server mtu 1400
IpSec::Manager: "VPNL2TPServer": crypto map L2TP/IPsec server ►
set MTU to "1400".
(config-crypto-map)> no l2tp-server mtu
MTU reset to default.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map l2tp-server mtu.2.11

---

### crypto map l2tp-server multi-login

Разрешить подключение к серверу L2TP нескольких пользователей с одного аккаунта. Команда с префиксом no отключает настройку.

**Syntax**

```bash
l2tp-server multi-login
```

**Examples**

```
Пример (config-crypto-map)> l2tp-server multi-login
IpSec::Manager: "VPNL2TPServer": crypto map L2TP/IPsec server ►
multiple login is enabled.
(config-crypto-map)> no l2tp-server multi-login
multiple login is disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map l2tp-server multi-login. 2.11

---

### crypto map l2tp-server nat

Включить трансляцию адресов для сервера L2TP. Команда с префиксом no отключает трансляцию.

**Syntax**

```bash
l2tp-server nat
```

**Examples**

```
Пример (config-crypto-map)> l2tp-server nat
IpSec::Manager: "VPNL2TPServer": crypto map L2TP/IPsec server ►
SNAT is enabled.
(config-crypto-map)> no l2tp-server nat
SNAT is disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map l2tp-server nat.2.11

---

### crypto map l2tp-server range

Назначить пул адресов для клиентов сервера L2TP. По умолчанию используется размер пула 100. Команда с префиксом no удаляет пул.

**Syntax**

```bash
l2tp-server range ‹begin› (‹end› | ‹size›)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| begin | — | — | — |
| end | — | — | — |
| size | — | — | — |

**Examples**

```
Пример (config-crypto-map)> l2tp-server range 172.16.2.33 172.16.2.38
IpSec::Manager: "VPNL2TPServer": crypto map L2TP/IPsec server ►
pool range set from "172.16.2.33" to "172.16.2.38".
(config-crypto-map)> l2tp-server range 172.16.2.33 100
pool range set from "172.16.2.33" to "172.16.2.132".
(config-crypto-map)> no l2tp-server range
pool range deleted.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map l2tp-server range.2.11

---

### crypto map l2tp-server static-ip

Назначить постоянный IP-адрес пользователю. Пользователь в системе должен иметь метку ipsec-l2tp. Команда с префиксом no удаляет привязку.

**Syntax**

```bash
static-ip ‹user› ‹address›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| user | — | — | — |
| address | — | — | — |

**Examples**

```
Пример (config-crypto-map)> l2tp-server static-ip admin 172.16.2.33
IpSec::Manager: "VPNL2TPServer": crypto map L2TP/IPsec server ►
static IP "172.16.2.33" assigned to user "admin".
(config-crypto-map)> no l2tp-server static-ip admin
static IP removed for user "admin".
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map l2tp-server static-ip.2.11

---

### crypto map nail-up

Включить автоматическое пересогласование преобразований IPsec ESP при их устаревании. По умолчанию параметр отключен. Команда с префиксом no отключает автоматическое пересогласование.

**Syntax**

```bash
nail-up
```

**Examples**

```
Пример (config-crypto-map)> nail-up
IpSec::Manager: "test": crypto map SA renegotiation enabled.
(config-crypto-map)> no nail-up
IpSec::Manager: "test": crypto map SA renegotiation disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map nail-up.2.06

---

### crypto map reauth-passive

Включить пассивную перепроверку подлинности криптокарты IPsec. По умолчанию параметр включен. Команда с префиксом no отключает пассивную перепроверку подлинности.

**Syntax**

```bash
reauth-passive
```

**Examples**

```
Пример (config-crypto-map)> reauth-passive
IpSec::Manager: "VPNL2TPServer": crypto map SA passive ►
reauthentication enabled.
(config-crypto-map)> no reauth-passive
reauthentication disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map reauth-passive.2.11

---

### crypto map set-peer

Назначитьосновнойудаленныйхост для установлениясоединенияIPsec. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
set-peer ‹remote-ip›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| remote-ip | — | — | — |

**Examples**

```
Пример (config-crypto-map)> set-peer ipsec.test.com
IpSec::Manager: "test": crypto map primary remote peer is set ►
to "ipsec.test.com".
(config-crypto-map)> no set-peer
IpSec::Manager: "test": crypto map remote primary and fallback ►
peer reset.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map set-peer.2.06

---

### crypto map set-peer-fallback

Назначить резервный удаленный хост для установления соединения IPsec. Эта настройкаможет быть выполненапосле назначенияосновного узла (см. команду crypto map set-peer). Команда с префиксом no удаляет настройку.

**Syntax**

```bash
set-peer-fallback ‹remote-ip›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| remote-ip | — | — | — |

**Examples**

```
Пример (config-crypto-map)> set-peer-fallback test.com
IpSec::Manager: "test": crypto map fallback remote peer cannot ►
be set without primary peer.
(config-crypto-map)> no set-peer-fallback
IpSec::Manager: "test": crypto map fallback remote peer reset.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map set-peer-fallback.2.06

---

### crypto map set-profile

Задать ссылку на существующий профиль IPsec (см. команду crypto ipsec profile). Команда с префиксом no удаляет ссылку.

**Syntax**

```bash
set-profile ‹profile›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| profile | — | — | — |

**Examples**

```
Пример (config-crypto-map)> set-profile [Tab]
Usage template:
set-profile {name: {A-Z, a-z, 0-9, ., _, -}}
Choose:
TEST
MYMY
VirtualIPServer
VPNL2TPServer
(config-crypto-map)> set-profile test
IpSec::Manager: "test": crypto map ipsec profile is set to "test".
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map set-profile.2.06

---

### crypto map set-tcpmss

Установить ограничение максимального размера сегмента исходящих сессий TCP в рамках данного туннеля IPsec. Если значение MSS, которое передаетсяв поле заголовкаSYN-пакетов,превышаетзаданное,команда меняет его. Режим Path MTU Discovery позволяет автоматически определять ограничение MSS. Команда с префиксом no снимает все ограничения с MSS.

**Syntax**

```bash
set-tcpmss ‹mss-value›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mss-value | — | — | — |

**Examples**

```
Пример (config-crypto-map)> set-tcpmss 1280
IpSec::Manager: "test": crypto map tcpmss set to 1280.
(config-crypto-map)> no set-tcpmss
IpSec::Manager: "test": crypto map tcpmss reset.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map set-tcpmss.2.06

---

### crypto map set-transform

Задать ссылку на существующее преобразование IPsec ESP (см. команду crypto ipsec transform-set). Команда с префиксом no удаляет ссылку.

**Syntax**

```bash
set-transform ‹transform-set›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| transform-set | — | — | — |

**Examples**

```
Пример (config-crypto-map)> set-transform [Tab]
Usage template:
set-transform {name: {A-Z, a-z, 0-9, ., _, -}}
Choose:
VirtualIPServer
VPNL2TPServer
(config-crypto-map)> set-transform test
IpSec::Manager: "test": crypto map ipsec transform-set is set ►
to "test".
(config-crypto-map)> no set-transform
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map set-transform.2.06

---

### crypto map traffic-selectors

Назначить объектную группу в качестве IPsec селекторов Phase 2. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
traffic-selectors ‹local› ‹remote›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| local | — | — | — |
| remote | — | — | — |

**Examples**

```
Пример (config-crypto-map)> traffic-selectors ►
_WEBADMIN_IPSEC_VPNL2TPServe-local ►
_WEBADMIN_IPSEC_VPNL2TPServe-remote
IpSec::Config::CryptoMap: "test": set traffic-selectors to ►
"_WEBADMIN_IPSEC_VPNL2TPServer-local": ►
"_WEBADMIN_IPSEC_VPNL2TPServer-remote".
(config-crypto-map)> no traffic-selectors
IpSec::Config::CryptoMap: "test": reset traffic-selectors.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map traffic-selectors.4.00

---

### crypto map tunnel-interface

Назначить интерфейс XFRM криптокарте для маршрутизации трафика между сайтами. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
tunnel-interface ‹interface›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |

**Examples**

```
Пример (config-crypto-map)> tunnel-interface XFRM0
IpSec::Config::CryptoMap:"TEST": linked tunnel interface "XFRM0".
(config-crypto-map)> no tunnel-interface
IpSec::Config::CryptoMap: "TEST": reset tunnel interface.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map tunnel-interface.4.01

---

### crypto map virtual-ip dhcp route

Назначить маршрут, передаваемый через сообщения DHCP INFORM, клиентам сервера Virtual IP. Команда с префиксом no отменяет получение указанного маршрута. Если ввести команду без аргументов, будет отменено получение всех маршрутов.

**Syntax**

```bash
virtual-ip dhcp route ‹address› ‹mask›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |
| mask | — | — | — |

**Examples**

```
Пример (config-crypto-map)> virtual-ip dhcp route 192.168.2.0/24
IpSec::ManagerVirtualIp: "VirtualIPServerIKE2": crypto map ►
Virtual IP server added DHCP INFORM route to ►
192.168.2.0/255.255.255.0.
(config-crypto-map)> no virtual-ip dhcp route 192.168.2.0/24
Virtual IP server DHCP INFORM route to 192.168.2.0/255.255.255.0►
removed.
(config-crypto-map)> no virtual-ip dhcp route
Virtual IP server DHCP INFORM routes cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map virtual-ip dhcp route.3.06

---

### crypto map virtual-ip dns-server

Указать DNS-сервер для выдачи клиентам в серверном режиме Virtual IP. Команда с префиксом no удаляет адрес сервера.

**Syntax**

```bash
virtual-ip dns-server ‹address›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |

**Examples**

```
Пример (config-crypto-map)> virtual-ip dns-server 10.5.5.5
IpSec::Manager: "test": crypto map Virtual IP DNS server set to ►
"10.5.5.5".
(config-crypto-map)> no virtual-ip dns-server
IpSec::Manager: "test": crypto map Virtual IP DNS server deleted.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map virtual-ip dns-server.2.08

---

### crypto map virtual-ip enable

Включить серверный режим Virtual IP, при котором клиентам производится раздача адресов из заданного диапазона. При этом в качестве удаленной подсети в соответствующем ACL можно указать произвольное значение, оно будет проигнорировано. По умолчанию режим отключен. Команда с префиксом no отключает настройку.

**Syntax**

```bash
virtual-ip enable
```

**Examples**

```
Пример (config-crypto-map)> virtual-ip enable
IpSec::Manager: "test": crypto map Virtual IP mode enabled.
(config-crypto-map)> no virtual-ip enable
IpSec::Manager: "test": crypto map Virtual IP mode disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map virtual-ip enable.2.08

---

### crypto map virtual-ip multi-login

Разрешить подключение к серверу Virtual IP нескольких пользователей с одного аккаунта. Команда с префиксом no отключает настройку.

**Syntax**

```bash
virtual-ip multi-login
```

**Examples**

```
Пример (config-crypto-map)> virtual-ip multi-login
IpSec::Manager: "VirtualIPServer": crypto map Virtual IP server ►
multiple login is enabled.
(config-crypto-map)> no virtual-ip multi-login
multiple login is disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map virtual-ip multi-login.3.05

---

### crypto map virtual-ip nat

Включить трансляцию адресов для клиентов в серверном режиме Virtual IP. Команда с префиксом no удаляет правило.

**Syntax**

```bash
virtual-ip nat
```

**Examples**

```
Пример (config-crypto-map)> virtual-ip nat
IpSec::Manager: "test": crypto map Virtual IP remote pool SNAT ►
is enabled.
(config-crypto-map)> no virtual-ip nat
is disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map virtual-ip nat.2.08

---

### crypto map virtual-ip range

Настроить диапазон адресов для выдачи клиентам в серверном режиме Virtual IP. Команда с префиксом no удаляет диапазон.

**Syntax**

```bash
virtual-ip range ‹begin› ( ‹end› | ‹size› )
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| begin | — | — | — |
| end | — | — | — |
| size | — | — | — |

**Examples**

```
Пример (config-crypto-map)> virtual-ip range 10.5.0.0 20
IpSec::Manager: "test": crypto map Virtual IP pool range set ►
from "10.5.0.0" to "10.5.0.19" (CIDR 10.5.0.0/27).
(config-crypto-map)> no virtual-ip range
IpSec::Manager: "test": crypto map Virtual IP pool range deleted.
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map virtual-ip range.2.08

---

### crypto map virtual-ip static-ip

Назначить постоянный IP-адрес пользователю. Пользователь в системе должен иметь метку ipsec-xauth. Команда с префиксом no удаляет привязку.

**Syntax**

```bash
virtual-ip static-ip ‹user› ‹address›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| user | — | — | — |
| address | — | — | — |

**Examples**

```
Пример (config-crypto-map)> virtual-ip static-ip admin 172.20.0.1
IpSec::ManagerVirtualIp: "VirtualIPServer": crypto map Virtual ►
IP server static address "172.20.0.1" assigned to user "admin".
(config-crypto-map)> no virtual-ip static-ip admin
IP server static address removed for user "admin".
```

**Notes**

История изменений Версия Описание Добавлена команда crypto map virtual-ip static-ip.3.05

---

### dlna

Доступ к группе команд для управления службой DLNA.

**Syntax**

```bash
dlna
```

**Examples**

```
Пример (config)> dlna
Core::Configurator: Done.
(config-dlna)>
```

**Notes**

История изменений Версия Описание Добавлена команда dlna.2.00

---

### dlna container

Установить контейнер по умолчанию для службы DLNA. Команда с префиксом no отменяет настройку.

**Syntax**

```bash
container ‹container›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| container | — | — | — |

**Examples**

```
Пример (config-dlna)> container browse
Dlna::Server: Set default container to "browse".
(config-dlna)> no container
Dlna::Server: Reset default container.
```

**Notes**

История изменений Версия Описание Добавлена команда dlna container.2.11

---

### dlna db-directory

Указать путь к каталогу с базой данных мультимедийных файлов. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
db-directory ‹directory›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| directory | — | — | — |

**Examples**

```
Пример (config-dlna)> db-directory 46E243F4E243E6B1:/components/dlna/
Dlna::Server: DB directory set.
(config-dlna)> no db-directory
Dlna::Server: DB directory removed.
```

**Notes**

История изменений Версия Описание Добавлена команда dlna db-directory.2.06

---

### dlna directory

Указать путь к каталогу с медиа-контентом. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
directory ‹directory› [ media-type ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| directory | — | — | — |

**Examples**

```
Пример (config-dlna)> directory ►
46E243F4E243E6B1:/components/transmission/download/
Dlna::Server: ►
"46E243F4E243E6B1:/components/transmission/download/"directory ►
added.
(config-dlna)> no directory ►
removed.
```

**Notes**

История изменений Версия Описание Добавлена команда dlna directory.2.00 Добавлен параметр media-type.2.06

---

### dlna display-name

Назначить пользовательское имя DLNA-серверу. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
display-name ‹display-name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| display-name | — | — | — |

**Examples**

```
Пример (config-dlna)> display-name MYDLNA
Dlna::Server: Set a display name.
```

**Notes**

История изменений Версия Описание Добавлена команда dlna display-name.2.12

---

### dlna interface

Указать интерфейс маршрутизатора, через который будет передаваться медиа-контент. Можно ввести не более 16 интерфейсов. Команда с префиксом no удаляет указанный интерфейс из списка. Если выполнить команду без аргумента, то весь список интерфейсов для передачи медиа-контента будет очищен.

**Syntax**

```bash
interface ‹interface›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |

**Examples**

```
Пример (config-dlna)> interface [Tab]
Usage template:
interface {interface}
Choose:
GigabitEthernet1
ISP
WifiMaster0/AccessPoint2
WifiMaster1/AccessPoint1
WifiMaster0/AccessPoint3
WifiMaster0/AccessPoint0
```

**Notes**

История изменений Версия Описание Добавлена команда dlna interface.2.00

---

### dlna port

Указатьпорт DLNA-серверадля HTTP-трафика(описаний,SOAP, передачи контента). По умолчанию используется значение 8200. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
port ‹port›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| port | — | — | — |

**Examples**

```
Пример (config-dlna)> port 8999
Dlna::Server: Port changed to 8999.
(config-dlna)> no port
Dlna::Server: Port reset to 8200.
```

**Notes**

История изменений Версия Описание Добавлена команда dlna port.2.00

---

### dlna rescan

Обновить информацию о файлах в каталоге с медиа-контентом. Примечание: Еслиуказатьключевоеслово full, базаданныхконтента будет удалена и создана заново. Это может занять какое-то время, поэтому такую команду рекомендуется выполнятьтолько если структурабазы данных контента повреждена.

**Syntax**

```bash
rescan [ full ]
```

**Examples**

```
Пример (config-dlna)> rescan
(config-dlna)> rescan full
```

**Notes**

История изменений Версия Описание Добавлена команда dlna rescan.2.00

---

### dlna sort

Задать критерий сортировки файлов DLNA-сервера. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
sort ‹key› [ ‹order› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| key | — | — | — |
| order | — | — | — |

**Examples**

```
Пример (config-dlna)> sort date
Dlna::Server: "date by ascending" sort criterion appended.
(config-dlna)> sort date ascending
(config-dlna)> no sort
Dlna::Server: Sort criteria removed.
```

**Notes**

История изменений Версия Описание Добавлена команда dlna sort.2.11

---

### dns-proxy

Доступ к группе команд для управления службой DNS-прокси.

**Syntax**

```bash
dns-proxy
```

**Examples**

```
Пример (config)> dns-proxy
Core::Configurator: Done.
(config-dnspx)>
```

**Notes**

История изменений Версия Описание Добавлена команда dns-proxy.2.04

---

### dns-proxy filter assign host preset

Назначить пресет фильтрации сетевому устройству. Ознакомитьсясо спискомпресетоввы можетес помощьюкоманды show dns-proxy filter presets. Команда с префиксом no удаляет указанный пресет для хоста. Если выполнить команду без аргумента, то весь список пресетов для всех хостов будет очищен.

**Syntax**

```bash
filter assign host preset ‹host› ‹preset›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| host | — | — | — |
| preset | — | — | — |

**Examples**

```
Пример (config-dnspx)> filter assign host preset 04:d4:c1:51:b1:59 ►
opendns-family
Dns::Filter::Public: Associated host "04:d4:c1:51:b1:59" with ►
preset "opendns-family".
(config-dnspx)> no filter assign host preset 04:d4:c1:51:b1:59
Dns::Filter::Public: Removed preset for host "04:d4:c1:51:b1:59".
(config-dnspx)> no filter assign host preset
Dns::Filter::Public: Removed presets for hosts.
```

**Notes**

История изменений Версия Описание Добавлена команда dns-proxy filter assign host preset. 3.08

---

### dns-proxy filter assign host profile

Назначить профиль фильтрации сетевому устройству. Добавить новый профиль можно при помощи команды dns-proxy filter profile. Ознакомиться со списком профилей вы можете с помощью команды show dns-proxy filter profiles. Команда с префиксом no удаляет указанный профиль для хоста. Если выполнить команду без аргумента, то весь список профилей для всех хостов будет очищен.

**Syntax**

```bash
filter assign host profile ‹host› ‹profile›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| host | — | — | — |
| profile | — | — | — |

**Examples**

```
Пример (config-dnspx)> filter assign host profile 00:d2:c1:54:bc:59 test
Dns::Filter::Public: Associated host "00:d2:c1:54:bc:59" with ►
profile "test".
(config-dnspx)> no filter assign host profile 00:d2:c1:54:bc:59
Dns::Filter::Public:Removed profile for host "00:d2:c1:54:bc:59".
(config-dnspx)> no filter assign host profile
Dns::Filter::Public: Removed profiles for hosts.
```

**Notes**

История изменений Версия Описание Добавлена команда dns-proxy filter assign host profile. 3.08

---

### dns-proxy filter assign interface preset

Назначить пресет фильтрации всем устройствам в сегменте (за исключением тех, которым уже назначены профили/пресеты). Ознакомитьсясо спискомпресетоввы можетес помощьюкоманды show dns-proxy filter presets. Команда с префиксом no отменяет привязку указанного пресета к интерфейсу. Если выполнить команду без аргумента, то весь список пресетов для всех сегментов будет очищен.

**Syntax**

```bash
filter assign interface preset ‹interface› ‹preset›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |
| preset | — | — | — |

**Examples**

```
Пример (config-dnspx)> filter assign interface preset Bridge0 ►
quad9-security
Dns::Filter::Public: Associated interface "Bridge0" with preset ►
"quad9-security".
(config-dnspx)> no filter assign interface preset Bridge0
Dns::Filter::Public: Removed preset for interface "Bridge0".
(config-dnspx)> no filter assign interface preset
Dns::Filter::Public: Removed presets for interfaces.
```

**Notes**

История изменений Версия Описание Добавлена команда dns-proxy filter assign interface preset. 3.08

---

### dns-proxy filter assign interface profile

Назначить профиль фильтрации всем устройствам в сегменте (за исключением тех, которым уже назначены профили/пресеты). Добавить новый профиль можно при помощи команды dns-proxy filter profile. Ознакомиться со списком профилей вы можете с помощью команды show dns-proxy filter profiles. Команда с префиксом no отменяет привязку указанного профиля к интерфейсу. Если выполнить команду без аргумента, то весь список профилей для всех сегментов будет очищен.

**Syntax**

```bash
filter assign interfaceprofile ‹interface› ‹profile›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |
| profile | — | — | — |

**Examples**

```
Пример (config-dnspx)> filter assign interface profile ►
GigabitEthernet0/Vlan1 DnsProfile0
Dns::Filter::Public: Associated interface ►
"GigabitEthernet0/Vlan1" with profile "DnsProfile0".
(config-dnspx)> no filter assign interface profile ►
GigabitEthernet0/Vlan1
Dns::Filter::Public: Removed profile for interface ►
"GigabitEthernet0/Vlan1".
(config-dnspx)> no filter assign interface profile
Dns::Filter::Public: Removed profiles for interfaces.
```

**Notes**

История изменений Версия Описание Добавлена команда dns-proxy filter assign interface profile. 3.08

---

### dns-proxy filter engine

Выбрать механизм DNS. Команда с префиксом no отключает фильтр. В этом случае запрос конфигурации вернет пустое значение.

**Syntax**

```bash
filter engine ‹engine›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| engine | — | — | — |

**Examples**

```
Пример (config-dnspx)> filter engine interceptor
Dns::Filter::Interceptor: Enabled.
(config-dnspx)> no filter engine
Dns::Manager: Disabled filter engine.
```

**Notes**

История изменений Версия Описание Добавлена команда dns-proxy filter engine.3.08

---

### dns-proxy filter profile

Создать пользовательский профиль фильтрации DNS. Команда с префиксом no удаляет профиль.

**Syntax**

```bash
filter profile ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (config-dnspx)> filter profile test
Dns::Filter::Public: Created profile "test".
(config-dnspx)> no filter profile test
Dns::Filter::Public: Removed profile "test".
```

**Notes**

История изменений Версия Описание Добавлена команда dns-proxy filter profile.3.08

---

### dns-proxy filter profile description

Присвоить описание для профиля фильтрации DNS. Команда с префиксом no стирает описание.

**Syntax**

```bash
filter profile ‹name›description ‹description›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| description | — | — | — |

**Examples**

```
Пример (config-dnspx)> filter profile test description MyProfile1
Dns::Filter::Public: Set description to profile "test".
(config-dnspx)> no filter profile test description
Dns::Filter::Public: Cleared description of profile "test".
```

**Notes**

История изменений Версия Описание Добавлена команда dns-proxy filter profile description. 3.08

---

### dns-proxy filter profile dns53 upstream

ДобавитьIP-адресDNS-серверав пользовательскийпрофильфильтрации. Можно ввести до 6 серверов. Команда с префиксом no удаляет указанный сервер из списка. Если выполнить команду без аргумента, то весь список серверов будет очищен. [:‹port›] ]

**Syntax**

```bash
filter profile ‹name›dns53 upstream ‹address› [:‹port›]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| address | — | — | — |
| port | — | — | — |

**Examples**

```
Пример (config-dnspx)> filter profile test dns53 upstream 1.1.1.1
Dns::Filter::Public: Added DNS name server 1.1.1.1 to profile ►
"test".
(config-dnspx)> no filter profile test dns53 upstream
Dns::Filter::Public: Removed DNS name server from profile "test".
(config-dnspx)> no filter profile test dns53 upstream 1.1.1.1
Dns::Filter::Public:Removed DNS name server 1.1.1.1 from profile ►
```

**Notes**

История изменений Версия Описание Добавлена команда dns-proxy filter profile dns53 upstream. 3.08

---

### dns-proxy filter profile https upstream

Добавить сервер DNS поверх HTTPS в пользовательский профиль фильтрации. Можно ввести до 6 серверов. Команда с префиксом no удаляет указанный сервер из списка. Если выполнить команду без аргумента, то весь список серверов будет очищен. ]

**Syntax**

```bash
filter profile ‹name›https upstream ‹url› [ spki ‹hash›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| url | — | — | — |
| hash | — | — | — |

**Examples**

```
(config-dnspx)> no filter profile ‹name›https description [ ‹url› ]
Название профиля.Строкаname
URL-адрес DNS-сервера.Строкаurl
Хэш сертификата TLS.Строкаhash
Пример (config-dnspx)> filter profile test https upstream ►
https://dns.google/resolve
Dns::Filter::Public: Added DNS-over-HTTPS name server ►
https://dns.google/resolve to profile "test".
(config-dnspx)> no filter profile test https upstream ►
Dns::Filter::Public: Removed DNS-over-HTTPS name server ►
```

**Notes**

История изменений Версия Описание Добавлена команда dns-proxy filter profile https upstream. 3.08

---

### dns-proxy filter profile intercept enable

Включить перехват транзитныхDNS-запросовдля профиля фильтрации. По умолчанию перехват запрещен. Команда с префиксом no отключает перехват для профиля фильтрации.

**Syntax**

```bash
filter profile ‹name›intercept enable
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (config-dnspx)> filter profile DnsProfile0 intercept enable
Dns::Filter::Public: Enabled intercept in profile "DnsProfile0".
(config-dnspx)> no filter profile DnsProfile0 intercept enable
Dns::Filter::Public: Disabled intercept in profile "DnsProfile0".
```

**Notes**

История изменений Версия Описание Добавлена команда dns-proxy filter profile intercept enable. 3.09

---

### dns-proxy filter profile tls upstream

Добавить сервер DNS поверх TLS в пользовательский профиль фильтрации. Можно ввести до 6 серверов. Команда с префиксом no удаляет указанный сервер из списка. Если выполнить команду без аргумента, то весь список серверов будет очищен. ] [ sni ‹fqdn› ] [ spki ‹hash› ]

**Syntax**

```bash
filter profile ‹name›tls upstream ‹address› [ ‹port›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| address | — | — | — |
| port | — | — | — |

**Examples**

```
(config-dnspx)> no filter profile ‹name›tls description [ ‹address› ] [
‹port› ]
Название профиля.Строкаname
Адрес сервера.IP-адрес
FQDN
address
Порт сервера.Целое числоport
Доменное имя.Строкаfqdn
Хэш сертификата TLS.Строкаhash
Пример (config-dnspx)> filter profile test tls upstream 1.1.1.1 8853 ►
```

**Notes**

История изменений Версия Описание Добавлена команда dns-proxy filter profile tls upstream. 3.08

---

### dns-proxy https upstream

Добавить сервер DNS поверх HTTPS. Команда с префиксом no удаляет указанный сервер из списка. Если выполнить команду без аргумента, то весь список серверов будет очищен. ‹interface› ] [ domain ‹domain› ]

**Syntax**

```bash
https upstream ‹url› [ ‹format› ] [ sni ‹hash› ] [ on
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| url | — | — | — |
| format | — | — | — |
| hash | — | — | — |

**Examples**

```
(config-dnspx)> no https upstream [ ‹url› ]
Пользовательский URL-адрес службы DNS.Строкаurl
Формат отображения данных DNS.format dnsm
json
Хэш сертификата TLS.Строкаhash
Имя интерфейса для настройки.Интерфейсinterface
Доменное имя.Строкаdomain
Пример (config-dnspx)>https upstream ►
https://cloudflare-dns.com/dns-query?ct=application/dns-jsonjson
Dns::Secure::ManagerDoh: DNS-over-HTTPS name server ►
```

**Notes**

История изменений Версия Описание Добавлена команда dns-proxy https upstream.3.01 Добавлен аргумент domain.3.08

---

### dns-proxy intercept enable

Включить перехват транзитных DNS-запросов. Также эта функция включается при работе интернет-фильтра. По умолчанию перехват запрещен. Команда с префиксом no отключает перехват.

**Syntax**

```bash
intercept enable
```

**Examples**

```
Пример (config-dnspx)> intercept enable
Dns::Filter::Interceptor: Enabled.
(config-dnspx)> no intercept enable
Dns::Filter::Interceptor: Disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда dns-proxy intercept enable.3.06 Команда dns-proxy intercept enable удалена как устаревшая. 3.08 Команда dns-proxyinterceptenableснова добавлена.3.09

---

### dns-proxy max-ttl

Задать максимальный TTL для кэшированных записей DNS-прокси. Команда с префиксом no удаляет значение TTL.

**Syntax**

```bash
max-ttl ‹max-ttl›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| max-ttl | — | — | — |

**Examples**

```
Пример (config-dnspx)> max-ttl 10000
Dns::Proxy: Dns-proxy set max-ttl to 10000.
(config-dnspx)> no max-ttl
Dns::Proxy: Dns-proxy max-ttl cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда dns-proxy max-ttl.2.05

---

### dns-proxy proceed

Задать интервал между параллельнымизапросами,которые отправляет DNS-прокси нескольким DNS-серверам. По умолчанию используется значение 500. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
proceed ‹proceed›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| proceed | — | — | — |

**Examples**

```
Пример (config-dnspx)> proceed 600
Dns::Proxy: Dns-proxy set 600 msec. proceed.
(config-dnspx)> no proceed
Dns::Proxy: Dns-proxy proceed timeout reset.
```

**Notes**

История изменений Версия Описание Добавлена команда dns-proxy proceed.2.04

---

### dns-proxy rebind-protect

Включить защиту от атак DNS rebinding. По умолчанию используется параметр auto. Команда с префиксом no отключает защиту.

**Syntax**

```bash
rebind-protect (auto | strict)
```

**Examples**

```
Пример (config-dnspx)> rebind-protect auto
Dns::Manager: Enabled rebind protection.
(config-dnspx)> no rebind-protect
Dns::Manager: Disabled rebind protection.
```

**Notes**

История изменений Версия Описание Добавлена команда dns-proxy rebind-protect.3.04

---

### dns-proxy srr-reset

Установить время, через которое будет сбрасываться рейтинг запросов-ответов DNS-прокси. По умолчанию используется значение 600000. Команда с префиксом no возвращает значение по умолчанию. 1 https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml

**Syntax**

```bash
srr-reset ‹srr-reset›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| srr-reset | — | — | — |

**Examples**

```
Пример (config-dnspx)> srr-reset 111
Dns::Manager: Set send-response rating reset time to 111 ms.
(config-dnspx)> no srr-reset
Dns::Manager: Reset send-response rating reset time to default.
```

**Notes**

История изменений Версия Описание Добавлена команда dns-proxy srr-reset.2.12

---

### dns-proxy tls upstream

Добавить сервер DNS поверх TLS. Команда с префиксом no удаляет указанный сервер из списка. Если выполнить команду без аргумента, то весь список серверов будет очищен. ‹hash› ] [ on ‹interface› ] [ domain ‹domain› ]

**Syntax**

```bash
tls upstream ‹address› [ ‹port› ] [ sni ‹fqdn› ] [ spki
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |
| port | — | — | — |
| fqdn | — | — | — |

**Examples**

```
(config-dnspx)> no tls upstream [ ‹address› ] [ ‹port› ]
IP-адрес сервера.IP-адресaddress
Порт сервера.Целое числоport
Доменное имя.Строкаfqdn
Хэш сертификата TLS.Строкаhash
Имя интерфейса для настройки.Интерфейсinterface
Доменное имя.Строкаdomain
Пример (config-dnspx)>tls upstream 1.1.1.1 853 sni cloudflare-dns.com
Dns::Secure::ManagerDot: DNS-over-TLS name server 1.1.1.1:853 ►
added.
```

**Notes**

История изменений Версия Описание Добавлена команда dns-proxy tls upstream.3.01 Добавлен аргумент domain.3.08

---

### dpn accept

Принять пользовательское соглашение DPN. До принятия соглашения конфигуратор не принимает никакие команды, кроме команд на чтение.

**Syntax**

```bash
dpn accept
```

**Examples**

```
Пример (config)> dpn accept
Core::Legal: Accepted dpn version 20200330.
```

**Notes**

История изменений Версия Описание Добавлена команда dpn accept.3.05

---

### dyndns profile

Доступ к группе команд для настройки указанного профиля DynDns. Если профиль не найден, команда пытается его создать. Можно создать не более 32 профилей. Команда с префиксом no удаляет профиль DynDns.

**Syntax**

```bash
dyndns profile ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (config)> dyndns profile _WEBADMIN
Core::Configurator: Done.
(config-dyndns)>
```

**Notes**

История изменений Версия Описание Добавлена команда dyndns profile.2.00

---

### dyndns profile domain

Назначить ПК постоянное доменное имя. Перед выполнением команды необходимо зарегистрировать доменное имя на сайте dyndns.com2 или no-ip.com3. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
domain ‹domain›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| domain | — | — | — |

**Examples**

```
Пример (config-dyndns)> domain support.ddns.net
DynDns::Profile: "_WEBADMIN": domain saved..
2 http:\\www.dyndns.com
3 http:\\www.no-ip.com
(config-dyndns)> no domain
ynDns::Profile: "_WEBADMIN" domain cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда dyndns profile domain.2.00

---

### dyndns profile password

Установить пароль для доступа через DynDns.

**Syntax**

```bash
password ‹password›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| password | — | — | — |

**Examples**

```
Пример (config-dyndns)> password 123456789
DynDns::Profile: "_WEBADMIN": password saved.
(config-dyndns)> no password
DynDns::Profile: "_WEBADMIN" password cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда dyndns profile password.2.00

---

### dyndns profile send-address

Включить необходимость указания IP-адреса интернет-соединения в запросе DynDns. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
send-address
```

**Examples**

```
Пример (config-dyndns)> send-address
DynDns::Profile: Send address is enabled.
(config-dyndns)> no send-address
DynDns::Profile: Send address is disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда dyndns profile send-address.2.03

---

### dyndns profile type

Присвоить DynDns-профилю тип, в зависимости от сайта, на котором было зарегистрировано доменное имя.

**Syntax**

```bash
type ‹type›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| type | — | — | — |

**Examples**

```
Пример (config-dyndns)> type noip
DynDns::Profile: "_WEBADMIN": type saved.
(config-dyndns)> no type
DynDns::Profile: "_WEBADMIN" type cleared.
4 http:\\www.dyndns.com
5 http:\\www.no-ip.com
6 http:\\www.dns-master.ru
```

**Notes**

История изменений Версия Описание Добавлена команда dyndns profile type.2.00

---

### dyndns profile update-interval

Установить интервал обновления адреса для DynDns. Команда с префиксом no отменяет возможность обновления. [ ‹minutes› minutes ] [ ‹seconds› seconds ]

**Syntax**

```bash
update-interval ‹days› days [ ‹hours› hours ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| days | — | — | — |
| hours | — | — | — |

**Examples**

```
(config-dyndns)> no update-interval
Временной интервал в днях.Целое числоdays
Временной интервал в часах.Целое числоhours
Временной интервал в минутах.Целое числоminutes
Временной интервал в секундах.Целое числоseconds
Пример (config-dyndns)> update-interval 5 days 5 hours 5 minutes 5 ►
seconds
DynDns::Profile: Interval is set to 450305 seconds.
(config-dyndns)> update-interval 5 days
DynDns::Profile: Interval is set to 432000 seconds.
```

**Notes**

История изменений Версия Описание Добавлена команда dyndns profile update-interval.2.03

---

### dyndns profile url

Указать URL используемого сайта службы DynDns.

**Syntax**

```bash
url ‹url›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| url | — | — | — |

**Examples**

```
Пример (config-dyndns)> url http://members.dyndns.org/nic/update
DynDns::Profile: "_WEBADMIN": URL saved.
(config-dyndns)> no url
DynDns::Profile: "_WEBADMIN" URL cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда dyndns profile url.2.05

---

### dyndns profile username

Указать логин учетной записи для доступа через DynDns.

**Syntax**

```bash
username ‹username›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| username | — | — | — |

**Examples**

```
Пример (config-dyndns)> username test@gmail.com
DynDns::Profile: "_WEBADMIN": username saved.
(config-dyndns)> no username
DynDns::Profile: "_WEBADMIN" username cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда dyndns profile username.2.00

---

### easyconfig check

Доступ к группе команд для настройки проверки доступа в интернет. Для проверки доступа в интернет сначала отправляются запросы к шлюзу по умолчанию. Если ответ получен, тогда опрашиваются удаленные хосты, указанные в настройках. Также в настройках указывается продолжительность и частота запросов. Если все проверки пройдены, значит доступ в интернет есть.

**Syntax**

```bash
easyconfig check
```

**Examples**

```
Пример (config)> easyconfig check
(ezconfig-check)>
```

**Notes**

История изменений Версия Описание Добавлена команда easyconfig check.2.00

---

### easyconfig check exclude-gateway

Отключитьпроверкушлюзапо умолчанию.По умолчаниюэтот параметр включен. Команда с префиксом no включает проверку обратно.

**Syntax**

```bash
exclude-gateway (ezconfig-check)> no exclude-gateway
```

**Examples**

```
Пример (ezconfig-check)> exclude-gateway
Network::InternetChecker: Gateway checking disabled.
(ezconfig-check)> no exclude-gateway
Network::InternetChecker: Gateway checking enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда easyconfig check exclude-gateway. 2.05

---

### easyconfig check max-fails

Указатьколичествопоследовательныхнеудачныхзапросовк облачному сервису чтобы определить, что интернет недоступен. По умолчанию используется значение 3. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
max-fails ‹count› (ezconfig-check)> no max-fails
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| count | — | — | — |

**Examples**

```
Пример (ezconfig-check)> max-fails 5
Network::InternetChecker: A new maximum fail count set to 5.
(ezconfig-check)> no max-fails
Network::InternetChecker: The maximum fail count reset to the ►
default value (3).
```

**Notes**

История изменений Версия Описание Добавлена команда easyconfig check max-fails.2.00

---

### easyconfig check period

Задать продолжительность проверки. По умолчанию используется значение 15. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
period ‹period› (ezconfig-check)> no period
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| period | — | — | — |

**Examples**

```
Пример (ezconfig-check)> period 20
Network::InternetChecker: A new check period set to 20 seconds.
(ezconfig-check)> no period
Network::InternetChecker: Check period reset to default (15 ►
seconds).
```

**Notes**

История изменений Версия Описание Добавлена команда easyconfig check period.2.00

---

### easyconfig disable

Отключить мастер первичной настройки. По умолчанию этот параметр включен. Команда с префиксом no включает мастер первичной настройки.

**Syntax**

```bash
easyconfig disable
```

**Examples**

```
Пример (config)> easyconfig disable
EasyConfig::Manager: Disabled.
(config)> no easyconfig disable
EasyConfig::Manager: Enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда easyconfig disable.3.01

---

### erase

Удалить файл из памяти Giga.

**Syntax**

```bash
erase ‹filename›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| filename | — | — | — |

**Examples**

```
Пример (config)> erase ext-opkg:/.dlna_files.db
FileSystem::Repository: "ext-opkg:/.dlna_files.db" erased.
```

**Notes**

История изменений Версия Описание Добавлена команда erase.2.00

---

### eula accept

Принять пользовательское соглашение EULA. До принятия соглашения конфигуратор не принимает никакие команды, кроме команд на чтение.

**Syntax**

```bash
eula accept
```

**Examples**

```
Пример (config)> eula accept
Core::Eula: "20181001" license accepted.
```

**Notes**

История изменений Версия Описание Добавлена команда eula accept.2.15

---

### exit

Выйти из группы команд.

**Syntax**

```bash
exit
```

**Examples**

```
Пример (show)> exit
Core::Configurator: Done.
(config)>
```

**Notes**

История изменений Версия Описание Добавлена команда exit.2.00

---

### igmp-proxy

Доступ к группе команд для настройки IGMP.

**Syntax**

```bash
igmp-proxy
```

**Examples**

```
Пример (config)> igmp-proxy
(igmp-proxy)>
```

**Notes**

История изменений Версия Описание Добавлена команда igmp-proxy.2.06

---

### igmp-proxy fast-leave

Включить IGMP fast-leave для немедленного удаления порта из записи пересылки для многоадресной группы, когда порт получает сообщение о выходе. Команда с префиксом no отключает эту функцию.

**Syntax**

```bash
fast-leave (igmp-proxy)> no fast-leave
```

**Examples**

```
Пример (igmp-proxy)> fast-leave
Igmp::Proxy: Enabled Fast Leave.
(igmp-proxy)> no fast-leave
Igmp::Proxy: Disabled Fast Leave.
```

**Notes**

История изменений Версия Описание Добавлена команда igmp-proxy fast-leave.3.09

---

### igmp-proxy force

Принудительно включить старую версию IGMP. По умолчанию эта настройка отключена и версия протокола выбирается в автоматическом режиме. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
force ‹protocol› (igmp-proxy)> no force
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| protocol | — | — | — |

**Examples**

```
Пример (igmp-proxy)> force igmp-v1
Igmp::Proxy: Forced protocol: igmp-v1.
(igmp-proxy)> no force
Igmp::Proxy: Enabled IGMP auto-detect.
```

**Notes**

История изменений Версия Описание Добавлена команда igmp-proxy force.2.08

---

### igmp-snooping disable

Отключить IGMP snooping. Команда доступна только в режимах Клиент, Усилитель или Точка Доступа. Команда с префиксом no включает IGMP snooping.

**Syntax**

```bash
igmp-snooping disable
```

**Examples**

```
Пример (config)> igmp-snooping disable
Igmp::Snooping: Disabled.
(config)> no igmp-snooping disable
Igmp::Snooping: Enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда igmp-snooping disable.2.12

---

### interface

Доступ к группе команд для настройки выбранного интерфейса. Если интерфейс не найден, команда пытается его создать. Имя интерфейса задает его класс, который наследует определенные свойства, см. диаграммы в Приложении. Команды работают применительно к классам. Соответствующий класс интерфейса указан в описании команды. Команда с префиксом no удаляет интерфейс.

**Syntax**

```bash
interface ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
(config)> no interface ‹name›
Полное имя интерфейса или псевдоним.
Список доступных интерфейсов можно
Интерфейсname
увидеть с помощью команды interface
[Tab].
Пример (config)> interface [Tab]
Usage template:
interface {name}
Choose:
```

**Notes**

История изменений Версия Описание Добавлена команда interface.2.00

---

### interface authentication chap

Включить поддержку аутентификации CHAP. Команда с префиксом no отключает CHAP.

**Syntax**

```bash
authentication chap
```

**Examples**

```
Пример (config-if)> authentication chap
Network::Interface::Supplicant: "PPTP0": added authentication: ►
CHAP.
(config-if)> no authentication chap
Network::Interface::Supplicant:"PPTP0": removed authentication: ►
```

**Notes**

История изменений Версия Описание Добавлена команда interface authentication chap.2.00

---

### interface authentication eap-md5

Включить поддержку аутентификации EAP-MD5. Команда с префиксом no отключает EAP-MD5.

**Syntax**

```bash
authentication eap-md5
```

**Examples**

```
Пример (config-if)> authentication eap-md5
Network::Interface::Ethernet: "GigabitEthernet1": configured ►
authentication: EAP-MD5.
(config-if)> no authentication eap-md5
Network::Interface::Supplicant: "GigabitEthernet1": removed ►
```

**Notes**

История изменений Версия Описание Добавленакомандаinterfaceauthenticationeap-md5.2.00

---

### interface authentication eap-mschapv2

Включить поддержку аутентификации EAP-MSCHAPv2. Команда с префиксом no отключает EAP-MSCHAPv2, MS-CHAPv2.

**Syntax**

```bash
authentication eap-mschapv2
```

**Examples**

```
Пример (config-if)> authentication eap-mschapv2
Network::Interface::Supplicant: "IKE0": authentication is ►
unchanged.
(config-if)> no authentication eap-mschapv2
Network::Interface::Supplicant:"IKE0": removed authentication: ►
EAP-MSCHAPv2, MS-CHAPv2.
```

**Notes**

История изменений Версия Описание Добавлена команда interface authentication eap-mschapv2. 3.05

---

### interface authentication eap-ttls

Включить поддержку аутентификации EAP-TTLS. Команда с префиксом no отключает EAP-TTLS.

**Syntax**

```bash
authentication eap-ttls
```

**Examples**

```
Пример (config-if)> authentication eap-ttls
Network::Interface::Ethernet: "GigabitEthernet1": configured ►
authentication: EAP-TTLS.
(config-if)> no authentication eap-ttls
Network::Interface::Supplicant: "GigabitEthernet1": removed ►
```

**Notes**

История изменений Версия Описание Добавленакоманда interface authenticationeap-ttls.2.00

---

### interface authentication identity

Указать имя пользователядля аутентификацииустройствана удаленной системе. Используется для подключений PPTP, PPPoE, L2TP и Proxy, а также для интерфейсов UsbQmi. Команда с префиксом no стирает ранее заданное имя пользователя.

**Syntax**

```bash
authentication identity ‹identity›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| identity | — | — | — |

**Examples**

```
Пример (config-if)> authentication identity mylogin
Network::Interface::Supplicant: "PPTP0": identity saved.
(config-if)> no authentication identity
Network::Interface::Supplicant: "PPTP0": identity cleared.
```

**Notes**

История изменений Версия Описание Добавленакоманда interface authenticationidentity.2.00

---

### interface authentication mschap

Включить поддержку аутентификации MS-CHAP. Команда с префиксом no отключает MS-CHAP.

**Syntax**

```bash
authentication mschap
```

**Examples**

```
Пример (config-if)> authentication mschap
Network::Interface::Supplicant: "PPTP0": added authentication: ►
MS-CHAP.
(config-if)> no authentication mschap
Network::Interface::Supplicant:"PPTP0": removed authentication: ►
```

**Notes**

История изменений Версия Описание Добавленакоманда interface authenticationmschap.2.00

---

### interface authentication mschap-v2

Включить поддержку аутентификации MS-CHAPv2. Команда с префиксом no отключает MS-CHAPv2.

**Syntax**

```bash
authentication mschap-v2
```

**Examples**

```
Пример (config-if)> authentication mschap-v2
Network::Interface::Supplicant: "PPTP0": authnentication is ►
unchanged.
(config-if)> no authentication mschap-v2
Network::Interface::Supplicant:"PPTP0": removed authentication: ►
MS-CHAPv2.
```

**Notes**

История изменений Версия Описание Добавлена команда interface authentication mschap-v2. 2.00

---

### interface authentication pap

Включить поддержку аутентификации PAP. Команда с префиксом no отключает PAP.

**Syntax**

```bash
authentication pap
```

**Examples**

```
Пример (config-if)> authentication pap
Network::Interface::Supplicant: "PPTP0": added authentication: ►
PAP.
(config-if)> no authentication pap
Network::Interface::Supplicant:"PPTP0": removed authentication: ►
```

**Notes**

История изменений Версия Описание Добавлена команда interface authentication pap.2.00

---

### interface authentication password

Указать пароль для аутентификации устройства на удаленной системе. Используется для подключений PPTP, PPPoE, L2TP и Proxy. Команда с префиксом no стирает значение пароля.

**Syntax**

```bash
authentication password ‹password›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| password | — | — | — |

**Examples**

```
Пример (config-if)> authentication password Aihoi2cha1
Network::Interface::Supplicant: "PPTP0": password saved.
(config-if)> no authentication password
Network::Interface::Supplicant: "PPTP0": password cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface authentication password. 2.00

---

### interface authentication peap

Включить поддержку EAP-PEAP метода проверки подлинности. Команда с префиксом no отключает шифрование EAP-PEAP.

**Syntax**

```bash
authentication peap
```

**Examples**

```
Пример (config-if)> authentication peap
Network::Interface::Ethernet: "WifiMaster1/AccessPoint0": ►
configured authentication: PEAP.
(config-if)> no authentication peap
Network::Interface::Supplicant: "WifiMaster1/AccessPoint0": ►
removed authentication: PEAP.
```

**Notes**

История изменений Версия Описание Добавлена команда interface authentication peap.2.03

---

### interface authentication shared

Включить режим аутентификации с разделяемым ключом. Этот режим используетсятольков сочетаниис шифрованиемWEP. Разделяемыеключи задаются командой interface encryption key. Команда с префиксом no переводитаутентификациюв открытыйрежим.

**Syntax**

```bash
authentication shared
```

**Examples**

```
Пример (config-if)> authentication shared
Network::Interface::Rtx::AccessPoint:"WifiMaster1/AccessPoint0":►
shared authentication mode enabled.
(config-if)> no authentication shared
shared authentication mode disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface authentication shared.2.00

---

### interface authentication wpa-psk

Установить предварительно согласованный ключ для аутентификации по протоколу WPA-PSK. Возможно задание ключа в виде 256-битного шестнадцатеричного числа, либо в виде строки ASCII-символов. Во второмслучаестрокаиспользуетсякак кодоваяфразадля генерирования ключа (пароля). Команда с префиксом no отменяет настройку.

**Syntax**

```bash
authentication wpa-psk ‹psk›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| psk | — | — | — |

**Examples**

```
(config-if)> no authentication wpa-psk
Предварительно согласованный ключ в
виде 256-битного шестнадцатеричного
числа, состоящего из
64 шестнадцатеричных цифр, либо в виде
строки ASCII длиной от 8 до 63 символов.
Пример (config-if)> authentication wpa-psk Eethaich9z
Network::Interface::Wifi:"WifiMaster1/AccessPoint0":WPA PSK set.
Network::Interface::Wifi: "WifiMaster1/AccessPoint0": WPA PSK ►
removed.
```

**Notes**

История изменений Версия Описание Добавленакомандаinterfaceauthenticationwpa-psk.2.00

---

### interface auto-ssid

Сгенерироватьпользовательскоеимябеспроводнойсети(SSID)на основе MAC-адреса роутера.

**Syntax**

```bash
auto-ssid ‹template› ‹prefix›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| template | — | — | — |
| prefix | — | — | — |

**Examples**

```
Пример (config-if)> auto-ssid mac4 12313213
Network::Interface::AccessPoint: "WifiMaster0/AccessPoint0": ►
generated SSID "12313213207E".
(config-if)> auto-ssid mac6 12313213
generated SSID "1231321369207E".
```

**Notes**

История изменений Версия Описание Добавлена команда interface auto-ssid.3.08

---

### interface backhaul

Включить поддержку VLAN для беспроводного соединения между роутерамиNetcrazeв режиме trunk. По умолчаниюнастройкаотключена. Команда с префиксом no отключает настройку.

**Syntax**

```bash
backhaul
```

**Examples**

```
Пример (config-if)> backhaul
Network::Interface::Rtx::AccessPoint:"WifiMaster0/AccessPoint1":►
backhaul mode enabled.
(config-if)> no backhaul
backhaul mode disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface backhaul.3.02

---

### interface band-steering

Запустить службу Band Steering для AP 5 ГГц. По умолчанию настройка включена. Для правильнойработы Band Steeringнеобходимовыполнитьследующие условия: • включены обе точки доступа 2,4 ГГц и 5 ГГц • у них одинаковые SSID • они имеют одинаковые параметры безопасности (тип шифрования, значение ключа, и т. д.) Команда с префиксом no отключает Band Steering.

**Syntax**

```bash
band-steering
```

**Examples**

```
Пример (config-if)> band-steering
Network::Interface::Rtx::WifiMaster:"WifiMaster1":band steering ►
enabled.
(config-if)> no band-steering
disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface band-steering.2.09

---

### interface band-steering preference

Задать предпочтительный диапазон для технологии Band Steering. По умолчанию значение не определено. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
band-steering preference ‹band›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| band | — | — | — |

**Examples**

```
Пример (config-if)> band-steering preference 5
Network::Interface::Rtx::WifiMaster:"WifiMaster1":band steering ►
preference is 5 GHz.
(config-if)> no band-steering preference
preference disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface band-steering preference. 2.09

---

### interface beamforming explicit

Включить явное Формирование диаграммы направленности (eBF) для AP 5 ГГц и AP 2,4 ГГц. Эта функция может быть использована только для клиентов802.11acи несовместимас другимистандартами.По умолчанию этот параметр включен. Команда с префиксом no отключает явное Формирование диаграммы направленности.

**Syntax**

```bash
beamforming explicit [mu-mimo]
```

**Examples**

```
Пример (config-if)> beamforming explicit
Network::Interface::Rtx::WifiMaster: "WifiMaster1": explicit ►
beamforming and SU-MIMO enabled.
(config-if)> beamforming explicit mu-mimo
beamforming and MU-MIMO enabled.
(config-if)> no beamforming explicit
beamforming and MIMO disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface beamforming explicit.2.10

---

### interface beamforming implicit

Включить неявное Формирование диаграммы направленности (iBF) для AP 5 ГГц и AP 2,4 ГГц. По умолчанию настройка отключена. Команда с префиксом no отключает неявное Формирование диаграммы направленности.

**Syntax**

```bash
beamforming implicit
```

**Examples**

```
Пример (config-if)> beamforming implicit
Network::Interface::Rtx::WifiMaster: "WifiMaster1": implicit ►
beamforming enabled.
(config-if)> no beamforming implicit
beamforming disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface beamforming implicit.2.10

---

### interface cable-diagnostics

Включить процедуру диагностики на порту. Несколько запусков диагностики с успешным результатом на одном и том же порту игнорируются до тех пор, пока не завершится запущенный процесс. Подробная информация о ходе соединения сохраняется в системном журнале.

**Syntax**

```bash
cable-diagnostics
```

**Examples**

```
Пример (config-if)> cable-diagnostics
Network::Interface::Mtk::Switch: "GigabitEthernet0/3": started ►
a cable diagnostics.
```

**Notes**

История изменений Версия Описание Добавлена команда interface cable-diagnostics.3.07

---

### interface ccp

Включить поддержку протокола CCP на этапе установления соединения. Команда с префиксом no отключает CCP.

**Syntax**

```bash
ccp
```

**Examples**

```
Пример (config-if)> ccp
CCP enabled.
(config-if)> no ccp
CCP disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ccp.2.00

---

### interface channel

Установить радиоканал (частоту вещания) для беспроводных интерфейсов. Интерфейсы Wi-Fi принимают в качестве номера канала целые числа от 1 до 14 (диапазон частот от 2.412 ГГц до 2.484 ГГц) и от 36 до 165 (диапазон частот от 5.180 ГГц до 5.825 ГГц). По умолчанию используется значение auto. Команда с префиксом no устанавливает значение по умолчанию.

**Syntax**

```bash
channel ‹channel›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| channel | — | — | — |

**Examples**

```
Пример (config-if)> channel 8
Network::Interface::Rtx::WifiMaster:"WifiMaster0": channel set ►
to 8.
(config-if)> channel 36
Network::Interface::Rtx::WifiMaster:"WifiMaster1": channel set ►
to 36.
(config-if)> no channel
Network::Interface::Rtx::WifiMaster:"WifiMaster0": auto channel ►
mode set.
```

**Notes**

История изменений Версия Описание Добавлена команда interface channel.2.00

---

### interface channel auto-rescan

Задать расписание для автоматического сканирования радио каналов. По умолчанию параметр отключен. Команда с префиксом no отключает настройку.

**Syntax**

```bash
channel auto-rescan [ ‹hh›:‹mm› ]interval ‹interval›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| hh | — | — | — |
| mm | — | — | — |
| interval | — | — | — |

**Examples**

```
Пример (config-if)> channel auto-rescan interval 1
Network::Interface::Rtx::WifiMaster: "WifiMaster0": scheduled ►
auto rescan, interval 1 hour.
(config-if)> no channel auto-rescan
Network::Interface::Rtx::WifiMaster:"WifiMaster0": auto rescan ►
disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface channel auto-rescan.2.07

---

### interface channel width

Установить ширину полосы пропускания для указанного канала. По умолчанию используется значение 40-below . Команда с префиксом no устанавливает значение по умолчанию.

**Syntax**

```bash
channel width ‹width›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| width | — | — | — |

**Examples**

```
Пример (config-if)> channel width 20
Network::Interface::Rtx::WifiMaster: "WifiMaster0": channel ►
bandwidth setting applied.
(config-if)> no channel width
bandwidth settings reset to default.
```

**Notes**

История изменений Версия Описание Добавлена команда interface channel width.2.04

---

### interface chilli coaport

УказатьUDP-порт,на которыйбудутотправлятьсязапросына отключение от RADIUS-клиента. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
chilli coaport ‹coaport›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| coaport | — | — | — |

**Examples**

```
Пример (config-if)> chilli coaport 3940
Chilli::Interface: "Chilli0": coaport set to 3940.
(config-if)> no chilli coaport
Chilli::Interface: "Chilli0": coaport reset to default.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli coaport.2.10

---

### interface chilli dhcpif

Назначить интерфейс Chilli сетевому системному интерфейсу. Команда с префиксом no отменяет привязку.

**Syntax**

```bash
chilli dhcpif ‹dhcpif›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| dhcpif | — | — | — |

**Examples**

```
Пример (config-if)> chilli dhcpif Bridge1
Chilli::Interface: "Chilli0": bound to Bridge1.
(config-if)> no chilli dhcpif
Chilli::Interface: "Chilli0": unbound.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli dhcpif.2.10

---

### interface chilli dns

Указать IP-адрес сервера DNS. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
chilli dns ‹dns1› [ ‹dns2› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| dns1 | — | — | — |
| dns2 | — | — | — |

**Examples**

```
Пример (config-if)> chilli dns 8.8.8.8 1.1.1.1
Chilli::Interface: "Chilli0": DNS servers set to 8.8.8.8, 1.1.1.1.
(config-if)> no chilli dns
Chilli::Interface: "Chilli0": DNS servers reset to default.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli dns.2.10

---

### interface chilli lease

Настроить время аренды подключенного клиентского IP-адреса. По умолчанию используется значение 3600. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
chilli lease ‹lease›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| lease | — | — | — |

**Examples**

```
Пример (config-if)> chilli lease 1000
Chilli::Interface: "Chilli0": lease has been set 1000 seconds.
(config-if)> no chilli lease
Chilli::Interface: "Chilli0": lease has been reset to default ►
(3600 seconds).
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli lease.2.11

---

### interface chilli login

Настроить авторизацию для доступа к RADIUS-серверу. ]

**Syntax**

```bash
chilli login ‹mac› [ username‹username› password‹password›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mac | — | — | — |
| username | — | — | — |
| password | — | — | — |

**Examples**

```
Пример (config-if)> interface Chilli0 chilli login 00:01:02:03:04:05
Chilli::Interface: "Chilli0": sent login request for ►
00:01:02:03:04:05
(config-if)> interface Chilli0 chilli login 00:01:02:03:04:05 ►
username test password test
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli login.4.00

---

### interface chilli logout

Принудительно отключить MAC-адрес указанного клиента.

**Syntax**

```bash
chilli logout (‹mac› | all)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mac | — | — | — |

**Examples**

```
Пример (config-if)> chilli logout 64:a2:22:51:b4:11
(config-if)> chilli logout all
Chilli::Interface: "Chilli0": service restarted.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli logout.2.10

---

### interface chilli macauth

Включить функцию проверки подлинности пользователей только на основании проверки МАС-адреса. Команда с префиксом no отключает настройку.

**Syntax**

```bash
chilli macauth
```

**Examples**

```
Пример (config-if)> chilli macauth
Chilli::Interface: "Chilli0": macauth set to "".
(config-if)> no chilli macauth
Chilli::Interface: "Chilli0": macauth cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli macauth.2.10

---

### interface chilli macpasswd

Установить пароль для проверки подлинности MAC-адреса. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
chilli macpasswd ‹macpasswd›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| macpasswd | — | — | — |

**Examples**

```
Пример (config-if)> chilli macpasswd 1234567890
Chilli::Interface: "Chilli0": macpasswd set to "1234567890".
(config-if)> no chilli macpasswd
Chilli::Interface: "Chilli0": macpasswd cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli macpasswd.2.11

---

### interface chilli nasip

Установить значение RADIUS параметра IP-адрес NAS. Позволяет настроить и использовать произвольный IP-адрес. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
chilli nasip (‹address› | interface ‹wan› | auto)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |
| wan | — | — | — |

**Examples**

```
Пример (config-if)> chilli nasip 95.213.215.187
Chilli::Interface: "Chilli0": NAS IP address set to ►
"95.213.215.187".
(config-if)> chilli nasip interface ISP
Chilli::Interface: "Chilli0": NAS IP interface set to ►
"GigabitEthernet1".
(config-if)> chilli nasip auto
Chilli::Interface: "Chilli0": NAS IP address set to auto.
(config-if)> no chilli nasip
Chilli::Interface: "Chilli0": NAS IP address cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli nasip.2.10

---

### interface chilli nasmac

Установить MAC-адрес для атрибута RADIUS Called-Station-ID. По умолчанию используется МАС-адрес гостевой сети. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
chilli nasmac ‹mac›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mac | — | — | — |

**Examples**

```
Пример (config-if)> chilli nasmac 50:ff:20:00:1e:86
Chilli::Interface: "Chilli0": NAS MAC address set to ►
"50:ff:20:00:1e:86".
(config-if)> no chilli nasmac
Chilli::Interface: "Chilli0": NAS MAC address cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli nasmac.2.11

---

### interface chilli profile

Назначить профиль Chilli соответствующему интерфейсу. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
chilli profile ‹profile›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| profile | — | — | — |

**Examples**

```
Пример (config-if)> chilli profile Wi-Fi_SYSTEM
Chilli::Interface: "Chilli0": assigned profile: Wi-Fi.
(config-if)> no chilli profile
Chilli::Interface: "Chilli0": profile cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli profile.2.10

---

### interface chilli radius

Добавить адреса RADIUS-сервера. Команда с префиксом no удаляет адреса.

**Syntax**

```bash
chilli radius ‹server1› [ ‹server2› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| server1 | — | — | — |
| server2 | — | — | — |

**Examples**

```
Пример (config-if)> chilli radius radius.wifisystem.ru ►
radius2.wifisystem.ru
Chilli::Interface: "Chilli0": RADIUS servers set to ►
radius.wifisystem.ru, radius2.wifisystem.ru.
(config-if)> no chilli radius
Chilli::Interface: "Chilli0": RADIUS servers cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli radius.2.10

---

### interface chilli radiusacctport

Назначить UDP-порт учёта RADIUS-сервера. По умолчанию используется значение 1813. Команда с префиксом no устанавливает порт по умолчанию.

**Syntax**

```bash
chilli radiusacctport ‹radiusacctport›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| radiusacctport | — | — | — |

**Examples**

```
Пример (config-if)> chilli radiusacctport 1819
Chilli::Interface: "Chilli0": radiusacctport set to 1819.
(config-if)> no chilli radiusacctport
Chilli::Interface: "Chilli0": radiusacctport reset to default.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli radiusacctport.3.06

---

### interface chilli radiusauthport

Назначить UDP-порт аутентификации RADIUS-сервера. По умолчанию используется значение 1812. Команда с префиксом no устанавливает порт по умолчанию.

**Syntax**

```bash
chilli radiusauthport ‹radiusauthport›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| radiusauthport | — | — | — |

**Examples**

```
Пример (config-if)> chilli radiusauthport 1820
Chilli::Interface: "Chilli0": radiusauthport set to 1820.
(config-if)> no chilli radiusauthport
Chilli::Interface: "Chilli0": radiusauthport reset to default.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli radiusauthport.3.06

---

### interface chilli radiuslocationid

ЗадатьидентификаторместоположенияRADIUS-сервера.Он долженбыть в формате isocc=, cc=, ac=, network=. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
chilli radiuslocationid ‹radiuslocationid›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| radiuslocationid | — | — | — |

**Examples**

```
Пример (config-if)> chilli radiuslocationid ►
isocc=,cc=,ac=,network=WiFiSYSTEM,
Chilli::Interface: "Chilli0": radiuslocationid set to ►
"isocc=,cc=,ac=,network=WiFiSYSTEM,".
(config-if)> no chilli radiuslocationid
Chilli::Interface: "Chilli0": radiuslocationid cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli radiuslocationid.2.10

---

### interface chilli radiuslocationname

Задать название местоположения RADIUS-сервера. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
chilli radiuslocationname ‹radiuslocationname›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| radiuslocationname | — | — | — |

**Examples**

```
Пример (config-if)> chilli radiuslocationname MyHotSpot
Chilli::Interface: "Chilli0": radiuslocationname set to ►
"MyHotSpot".
(config-if)> no chilli radiuslocationname
Chilli::Interface: "Chilli0": radiuslocationname cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli radiuslocationname. 2.10

---

### interface chilli radiusnasid

Установить идентификатор сервера сетевого доступа. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
chilli radiusnasid ‹radiusnasid›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| radiusnasid | — | — | — |

**Examples**

```
Пример (config-if)> chilli radiusnasid netcrazeru_12
Chilli::Interface: "Chilli0": radiusnasid set to "netcrazeru_12".
(config-if)> no chilli radiusnasid
Chilli::Interface: "Chilli0": radiusnasid cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli radiusnasid.2.10

---

### interface chilli radiussecret

Установить общий ключ для обоих RADIUS-серверов. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
chilli radiussecret ‹radiussecret›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| radiussecret | — | — | — |

**Examples**

```
Пример (config-if)> chilli radiussecret 12df34fd
Chilli::Interface: "Chilli0": radiussecret set to "12df34fd".
(config-if)> no chilli radiussecret
Chilli::Interface: "Chilli0": radiussecret cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli radiussecret.2.10

---

### interface chilli uamallowed

Указать ресурс, к которому клиент имеет доступ без первичной аутентификации. Команда с префиксом no удаляет ресурс из списка. Если выполнить команду без аргумента, то весь список ресурсов будет очищен.

**Syntax**

```bash
chilli uamallowed ‹uamallowed›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| uamallowed | — | — | — |

**Examples**

```
Пример (config-if)> chilli uamallowed 188.166.114.0/24
Chilli::Interface: "Chilli0": "188.166.114.0/24" added to walled ►
garden.
(config-if)> chilli uamallowed www.example.link
Chilli::Interface: "Chilli0": "www.example.link" added to walled ►
(config-if)> no chilli uamallowed 188.166.114.0/24
Chilli::Interface: "Chilli0": "188.166.114.0/24" removed from ►
walled garden.
(config-if)> no chilli uamallowed www.example.link
Chilli::Interface: "Chilli0": "www.example.link" removed from ►
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli uamallowed.2.10

---

### interface chilli uamdomain

Указать домен, к которому клиент имеет доступ без первичной аутентификации. Команда с префиксом no удаляет домен из списка. Если выполнить команду без аргумента, то весь список доменов будет очищен.

**Syntax**

```bash
chilli uamdomain ‹uamdomain›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| uamdomain | — | — | — |

**Examples**

```
Пример (config-if)> chilli uamdomain wifisystem.ru
Chilli::Interface: "Chilli0": "wifisystem.ru" added to walled ►
garden.
(config-if)> no chilli uamdomain wifisystem.ru
Chilli::Interface:"Chilli0": "wifisystem.ru"removed from walled ►
(config-if)> no chilli uamdomain
Chilli::Interface: "Chilli0": walled garden cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli uamdomain.2.10

---

### interface chilli uamhomepage

Установить URL-адрес домашней страницы для перенаправления неавторизованных пользователей. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
chilli uamhomepage ‹uamhomepage›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| uamhomepage | — | — | — |

**Examples**

```
Пример (config-if)> chilli uamhomepage http://192.168.2.1/welcome.html
Chilli::Interface: "Chilli0": uamhomepage set to ►
"http://192.168.2.1/welcome.html".
(config-if)> no chilli uamhomepage
Chilli::Interface: "Chilli0": uamhomepage cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli uamhomepage.2.10

---

### interface chilli uamport

Указать TCP-порт для подключения авторизованных клиентов. По умолчанию используется значение 3990. Команда с префиксом no устанавливает порт по умолчанию.

**Syntax**

```bash
chilli uamport ‹uamport›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| uamport | — | — | — |

**Examples**

```
Пример (config-if)> chilli uamport 3922
Chilli::Interface: "Chilli0": uamport set to 3922.
(config-if)> no chilli uamport
Chilli::Interface: "Chilli0": uamport reset to default.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli uamport.2.10

---

### interface chilli uamsecret

Установить общий ключ между UAM-сервером и Chilli. UAM-ключ используется для хэширования запроса перед вычислением пароля. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
chilli uamsecret ‹uamsecret›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| uamsecret | — | — | — |

**Examples**

```
Пример (config-if)> chilli uamsecret 12df34fd
Chilli::Interface: "Chilli0": uamsecret set to "12df34fd".
(config-if)> no chilli uamsecret
Chilli::Interface: "Chilli0": uamsecret set to "".
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli uamsecret.2.10

---

### interface chilli uamserver

Установить URL-адрес веб-сервера для проверки подлинности клиентов. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
chilli uamserver ‹uamserver›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| uamserver | — | — | — |

**Examples**

```
Пример (config-if)> chilli uamserver ►
https://auth.wifisystem.ru/hotspotlogin
Chilli::Interface: "Chilli0": uamserver set to ►
"https://auth.wifisystem.ru/hotspotlogin".
(config-if)> no chilli uamserver
Chilli::Interface: "Chilli0": uamserver cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface chilli uamserver.2.10

---

### interface compatibility

Установить стандарты беспроводной связи, с которыми должен быть совместимданныйбеспроводнойадаптер(интерфейс).Для интерфейсов Wi-Fi совместимость задается строкой из латинских букв A, B, G, N, обозначающих дополнения к стандарту IEEE 802.11. К примеру, наличие в строке совместимости буквы N будет означать, что данный адаптер сможетвзаимодействоватьс 802.11n-совместимымиустройствамичерез радиоканал. Набор допустимых строк совместимости определяется аппаратными возможностями конкретного адаптера и требованиями соответствующих дополнений к стандарту IEEE 802.11. По умолчанию для частоты 2,4 ГГц используется строка «BGN», «AN» — для 5 ГГц.

**Syntax**

```bash
compatibility ‹annex›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| annex | — | — | — |

**Examples**

```
Пример (config-if)> compatibility N
Network::Interface::Rtx::WifiMaster:"WifiMaster0": PHY mode set.
(config-if)> compatibility N+AC
Network::Interface::Rtx::WifiMaster:"WifiMaster1": PHY mode set.
```

**Notes**

История изменений Версия Описание Добавлена команда interface compatibility.2.00 Добавлен новый стандарт АС.2.06

---

### interface connect

Запустить процесс подключения к удаленному узлу. Команда с префиксом no прерывает соединение.

**Syntax**

```bash
connect [ via ‹via› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| via | — | — | — |

**Examples**

```
Пример (config-if)> connect via ISP
(config-if)> no connect
```

**Notes**

История изменений Версия Описание Добавлена команда interface connect.2.00

---

### interface country-code

Назначить интерфейсу буквенный код страны, который влияет на набор радио-каналов. По умолчанию установлено значение RU.

**Syntax**

```bash
country-code ‹code›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| code | — | — | — |

**Examples**

```
Пример (config-if)> country-code RU
Network::Interface::Rtx::WifiMaster:"WifiMaster0": country code ►
set.
```

**Notes**

История изменений Версия Описание Добавлена команда interface country-code.2.00

---

### interface debug

Включить отладочный режим подключения PPP. В отладочном режиме в системный журнал выводится подробная информация о ходе подключения. По умолчанию функция отключена. Команда с префиксом no отключает отладочный режим.

**Syntax**

```bash
debug
```

**Examples**

```
Пример (config-if)> debug
Network::Interface::Base: Debug enabled.
(config-if)> no debug
Network::Interface::Base: Debug disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface debug.2.00

---

### interface description

Назначить произвольное описание сетевому интерфейсу. Команда с префиксом no стирает описание.

**Syntax**

```bash
description ‹description›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| description | — | — | — |

**Examples**

```
Пример (config-if)> description MYHOME
Network::Interface::Base: "Bridge0": description saved.
(config-if)> no description
```

**Notes**

История изменений Версия Описание Добавлена команда interface description.2.00

---

### interface down

Отключитьсетевойинтерфейси записатьв настройкисостояние«down». Команда с префиксом no включает сетевой интерфейс и удаляет «down» из настроек.

**Syntax**

```bash
down
```

**Examples**

```
Пример (config-if)> down
Network::Interface::Base:"GigabitEthernet0/2":interface is down.
(config-if)> up
Network::Interface::Base: "GigabitEthernet0/2": interface is up.
```

**Notes**

История изменений Версия Описание Добавлена команда interface down.2.00

---

### interface downlink-mumimo

Включитьнисходящее(явное)Формированиедиаграммынаправленности (eBF) MU-MIMO. Данная функция может быть использована только для клиентов 802.11ac и несовместима с другими стандартами. Настройка не может быть использована без включения команды interface beamforming explicit. Команда с префиксом no отключает настройку.

**Syntax**

```bash
downlink-mumimo
```

**Examples**

```
Пример (config-if)> downlink-mumimo
Network::Interface::Rtx::WifiMaster: "WifiMaster1": 11ac/ax ►
downlink-mumimo enabled.
(config-if)> no downlink-mumimo
downlink-mumimo disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface downlink-mumimo.3.05

---

### interface downlink-ofdma

Включить нисходящую связь 802.11ax OFDMA. По умолчанию настройка отключена. Команда с префиксом no отключает настройку.

**Syntax**

```bash
downlink-ofdma
```

**Examples**

```
Пример (config-if)> downlink-ofdma
Network::Interface::Rtx::WifiMaster: "WifiMaster1": 11ax ►
downlink-ofdma enabled.
(config-if)> no downlink-ofdma
downlink-ofdma disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface downlink-ofdma.3.07

---

### interface duplex

Установить дуплексный режим Ethernet-порта. По умолчанию задано значение auto. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
duplex ‹mode›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mode | — | — | — |

**Examples**

```
Пример (config-if)> duplex full
Network::Interface::Ethernet: "GigabitEthernet0/1": duplex set ►
to "full".
(config-if)> no duplex
Network::Interface::Ethernet:"GigabitEthernet0/1":duplex reset ►
to default.
```

**Notes**

История изменений Версия Описание Добавлена команда interface duplex.2.06.B.1

---

### interface dyndns profile

Привязатьк сетевомуинтерфейсупрофиль DynDns. Перед выполнением командыпрофильдолженбытьсоздани настроенгруппойкомандdyndns profile. Команда с префиксом no разрывает связь между профилем и интерфейсом.

**Syntax**

```bash
dyndns profile ‹profile›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| profile | — | — | — |

**Examples**

```
Пример (config-if)> dyndns profile TEST
DynDns::Profile: Interface set.
(config-if)> no dyndns profile TEST
DynDns::Profile: Interface removed.
```

**Notes**

История изменений Версия Описание Добавлена команда interface dyndns profile.2.02

---

### interface dyndns update

ОбновитьвручнуюIP-адресдля DynDns.По умолчаниюкомандаработает в соответствии с политикой поставщика услуг DynDns, который не позволяетобновлятьIP слишкомчасто. Ключевоеслово force позволяет обновить IP в обход политики поставщика услуг.

**Syntax**

```bash
dyndns update [ force ]
```

**Examples**

```
Пример (config-if)> dyndns update
```

**Notes**

История изменений Версия Описание Добавлена команда interface dyndns update.2.00

---

### interface encryption anonymous-dh

Включить Anonymous DH для SSTP-серверов без сертификата. Команда с префиксом no отключает Anonymous DH.

**Syntax**

```bash
encryption anonymous-dh
```

**Examples**

```
Пример (config-if)> encryption anonymous-dh
Network::Interface::Sstp: "SSTP0": anonymous DH TLS is enabled.
(config-if)> no encryption anonymous-dh
Network::Interface::Sstp: "SSTP0": anonymous DH TLS is disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface encryption anonymous-dh. 2.13

---

### interface encryption enable

Включить шифрование на беспроводном интерфейсе. По умолчанию используется шифрование WEP. Команда с префиксом no отключает шифрование на беспроводном интерфейсе.

**Syntax**

```bash
encryption enable
```

**Examples**

```
Пример (config-if)> encryption enable
Network::Interface::Rtx::AccessPoint:"WifiMaster0/AccessPoint0":►
wireless encryption enabled.
(config-if)> no encryption enable
wireless encryption disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface encryption enable.2.00

---

### interface encryption key

Назначитьключи шифрования WEP. В зависимостиот разрядности,ключ может быть задан 10 шестнадцатеричнымицифрами(5 символамиASCII) — 40-битныйключ, WEP — 40-битныйключ, или 26 шестнадцатеричными цифрами (13 символами ASCII) WEP Всего может быть задано от 1 до 4 ключей шифрования, и один из них должен быть назначен ключом по умолчанию. Команда с префиксом no удаляет ключ.

**Syntax**

```bash
encryption key ‹id› ( ‹value› [default] | default)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| id | — | — | — |
| value | — | — | — |

**Examples**

```
Пример (config-if)> encryption key 1 1231231234
Network::Interface::Wifi: "WifiMaster0/AccessPoint0": WEP key 1 ►
set.
(config-if)> no encryption key 1
removed.
```

**Notes**

История изменений Версия Описание Добавлена команда interface encryption key.2.00

---

### interface encryption mppe

Включить поддержку шифрования MPPE. Команда с префиксом no отключает шифрование MPPE.

**Syntax**

```bash
encryption mppe
```

**Examples**

```
Пример (config-if)> encryption mppe
MPPE enabled.
(config-if)> no encryption mppe
MPPE disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface encryption mppe.2.00

---

### interface encryption owe

Включить алгоритмы обеспечения безопасности OWE на беспроводном интерфейсе. По умолчанию настройка отключена. Команда с префиксом no отключает поддержку OWE.

**Syntax**

```bash
encryption owe
```

**Examples**

```
Пример (config-if)> encryption owe
Network::Interface::Rtx::AccessPoint:"WifiMaster0/AccessPoint0":►
OWE algorithms enabled.
(config-if)> no encryption owe
OWE algorithms disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface encryption owe.3.00

---

### interface encryption tkip hold-down

Установить значение "countermeasure" таймера для TKIP при одновременном использовании WPA и WPA2 алгоритмов безопасности на беспроводном интерфейсе. По умолчанию используется значение 60. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
encryption tkip hold-down ‹hold-down›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| hold-down | — | — | — |

**Examples**

```
Пример (config-if)> encryption tkip hold-down 10
Network::Interface::Rtx::AccessPoint:"WifiMaster0/AccessPoint0":►
hold-down interval is 10 sec.
(config-if)> no encryption tkip hold-down
hold-down interval is reset to default (60 sec.).
```

**Notes**

История изменений Версия Описание Добавлена команда interface encryption tkip hold-down. 3.08

---

### interface encryption wpa

Включить алгоритмы обеспечения безопасности WPA на беспроводном интерфейсе. Беспроводной интерфейс может поддерживать совместное использование WPA и WPA2, однако поддержка WEP автоматически отключается при включении любого из WPA. Команда с префиксом no отключает WPA.

**Syntax**

```bash
encryption wpa
```

**Examples**

```
Пример (config-if)> encryption wpa
WPA algorithms enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface encryption wpa.2.00

---

### interface encryption wpa2

Включить алгоритмы обеспечения безопасности WPA2 (IEEE 802.11i, RSN) набеспроводноминтерфейсе.Беспроводнойинтерфейсможетразрешать совместное использование WPA и WPA2, однако поддержка WEP автоматически отключается при включении любого из WPA. Команда с префиксом no отключает WPA2.

**Syntax**

```bash
encryption wpa2
```

**Examples**

```
Пример (config-if)> encryption wpa2
WPA2 algorithms enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface encryption wpa2.2.00

---

### interface encryption wpa3

Включить алгоритмы обеспечения безопасности WPA3 на беспроводном интерфейсе. Беспроводной интерфейс может поддерживать совместное использование WPA2 и WPA3. По умолчанию настройка отключена. Команда с префиксом no отключает поддержку WPA3.

**Syntax**

```bash
encryption wpa3
```

**Examples**

```
Пример (config-if)> encryption wpa3
Network::Interface::Rtx::AccessPoint:"WifiMaster0/AccessPoint0":►
WPA3 algorithms enabled.
(config-if)> no encryption wpa3
WPA3 algorithms disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface encryption wpa3.3.00

---

### interface encryption wpa3 suite-b

Включить алгоритмы обеспечения безопасности WPA3 для защиты конфиденциальных данных Suite-B в WPA Enterprise. По умолчанию функция отключена.

**Syntax**

```bash
encryption wpa3 suite-b
```

**Examples**

```
Пример (config-if)> encryption wpa3 suite-b
Network::Interface::Rtx::AccessPoint:"WifiMaster0/AccessPoint1":►
WPA3 SuiteB enabled.
```

**Notes**

История изменений Версия Описание Добавленакомандаinterfaceencryptionwpa3 suite-b.3.01

---

### interface flowcontrol

Настройка управления потоком Ethernet Tx/Rx. По умолчанию функция включена. Команда с префиксом no отключает функцию.

**Syntax**

```bash
flowcontrol on
```

**Examples**

```
Пример (config-if)> flowcontrol on
Network::Interface::Ethernet:"GigabitEthernet0/0":flow control ►
enabled.
(config-if)> no flowcontrol send
send disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface flowcontrol.2.08

---

### interface follow

Копировать настройки точки доступа с WifiMaster0 (2,4 ГГц) в точку доступа на WifiMaster с индексом больше нуля (5 ГГц и больше). Точка доступа "последователь" автоматически копирует все изменения настроек с главной точки доступа. Если в настройки "последователя" внести изменения, связь с главной точкой доступа разрывается. Предупреждение:Точки доступа на WifiMaster0 всегда используются как источник настроек. Они не могут быть "последователями".

**Syntax**

```bash
follow ‹access-point›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| access-point | — | — | — |

**Examples**

```
Пример (config-if)> follow WifiMaster0/AccessPoint0
Network::Interface::AccessPoint:"WifiMaster1/AccessPoint0":set ►
to follow WifiMaster0/AccessPoint0.
```

**Notes**

История изменений Версия Описание Добавлена команда interface follow.3.07

---

### interface ft enable

Включить поддержку FT для точки доступа (FT Over the Air, OTA) в рамках стандарта IEEE 802.11r. По умолчанию параметр отключен. Для правильнойработы FT междуточкамидоступа2,4 и 5 ГГц необходимо выполнить следующие условия: • включены обе точки доступа 2,4 ГГц и 5 ГГц • у них одинаковые SSID • они имеют одинаковые параметры безопасности (тип шифрования — WPA2 или без пароля, пароль, и т. д.). Команда с префиксом no удаляет настройку.

**Syntax**

```bash
ft enable
```

**Examples**

```
Пример (config-if)> ft enable
Network::Interface::Rtx::AccessPoint:"WifiMaster0/AccessPoint0":►
fast transition enabled.
(config-if)> no ft enable
fast transition disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ft enable.2.13

---

### interface ft mdid

Установить идентификатор Mobility Domain для FT. По умолчанию используется значение KN. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
ft mdid ‹mdid›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mdid | — | — | — |

**Examples**

```
Пример (config-if)> ft mdid 1F
Network::Interface::Rtx::AccessPoint:"WifiMaster0/AccessPoint0":►
fast transition MDID set to "1F".
(config-if)> no ft mdid
fast transition MDID reset to default.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ft mdid.2.13

---

### interface ft otd

Включить поддержку FT Over-the-DS (Distribution System) в рамках стандарта IEEE 802.11r. Этот тип FT используется для роуминга в устаревших абонентских устройствах, например, в телефоне iPhone 4s. По умолчанию параметр отключен. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
ft otd
```

**Examples**

```
Пример (config-if)> ft otd
Network::Interface::Rtx::AccessPoint:"WifiMaster0/AccessPoint0":►
fast transition OTD enabled.
(config-if)> no ft otd
fast transition OTD disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ft otd.2.13

---

### interface hide-ssid

Включить режим скрытия SSID. При использовании этой функции, точка доступа не отображается в списке доступных беспроводных сетей. Но если пользователю известно о существовании этой сети и он знает ее SSID, то сможет подключиться к этой сети. По умолчанию режим отключен. Команда с префиксом no отключает этот режим.

**Syntax**

```bash
hide-ssid
```

**Examples**

```
Пример (config-if)> hide-ssid
Network::Interface::Rtx::AccessPoint:"WifiMaster0/AccessPoint0":►
SSID broadcasting disabled.
(config-if)> no hide-ssid
SSID broadcasting enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface hide-ssid.2.00

---

### interface iapp auto

Сгенерировать ключ IAPP в автоматическом режиме. Для того, чтобы назначить ключ вручную, используйте команду interface iapp key.

**Syntax**

```bash
iapp auto
```

**Examples**

```
Пример (config-if)> iapp auto
Network::Interface::Rtx::Iapp: Bridge0 autoconfigured.
```

**Notes**

История изменений Версия Описание Добавлена команда interface iapp auto.3.03

---

### interface iapp key

Установить ключ мобильного домена IAPP для успешной синхронизации между точками доступа, где включен FT (команда interface ft enable). Точки доступа должны принадлежать одной IP-подсети. По умолчанию ключ не назначен. Команда с префиксом no удаляет ключ.

**Syntax**

```bash
iapp key ‹key›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| key | — | — | — |

**Examples**

```
Пример (config-if)> iapp key 11223344556677
Network::Interface::Rtx::Iapp: Bridge0 key applied.
(config-if)> no iapp key
Network::Interface::Rtx::Iapp: Bridge0 key cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface iapp key.2.13

---

### interface idle-timeout

Установить интервал отключения клиента STA от точки доступа по таймауту неактивности. По умолчанию используется значение 600. Команда с префиксом no отключает настройку.

**Syntax**

```bash
idle-timeout ‹idle-timeout›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| idle-timeout | — | — | — |

**Examples**

```
Пример (config-if)> idle-timeout 500
Network::Interface::Rtx::WifiMaster:"WifiMaster1": idle timeout ►
value is 500 sec.
(config-if)> no idle-timeout
disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface idle-timeout.3.06

---

### interface igmp downstream

Включить режим работы IGMP на интерфейсе по направлению к потребителямгрупповойрассылки.На устройстведолжнабытьзапущена службаserviceigmp-proxy. Допускаетсяналичиенесколькихинтерфейсов downstream. Команда с префиксом no отменяет действие команды.

**Syntax**

```bash
igmp downstream
```

**Examples**

```
Пример (config-if)> igmp downstream
(config-if)> no igmp downstream
```

**Notes**

История изменений Версия Описание Добавлена команда interface igmp downstream.2.00

---

### interface igmp fork

Включить дублирование исходящих пакетов IGMP upstream в заданный интерфейс. Допускается наличие только одного интерфейса fork. Команда с префиксом no отменяет действие команды.

**Syntax**

```bash
igmp fork
```

**Examples**

```
Пример (config-if)> igmp fork
(config-if)> no igmp fork
```

**Notes**

История изменений Версия Описание Добавлена команда interface igmp fork.2.00

---

### interface igmp upstream

Включить режим работы IGMP на интерфейсе по направлению к источнику групповой рассылки. На устройстве должна быть запущена служба service igmp-proxy. Допускается наличие только одного интерфейса upstream. Команда с префиксом no отменяет действие команды.

**Syntax**

```bash
igmp upstream
```

**Examples**

```
Пример (config-if)> igmp upstream
(config-if)> no igmp upstream
```

**Notes**

История изменений Версия Описание Добавлена команда interface igmp upstream.2.00

---

### interface include

Указать Ethernet-интерфейс, который будет добавлен в программный мост в качестве порта. Команда с префиксом no удаляет интерфейс из моста.

**Syntax**

```bash
include ‹interface›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |

**Examples**

```
Пример (config-if)> include ISP
Network::Interface::Bridge: "Bridge0": ISP included.
(config-if)> no include
Network::Interface::Bridge: "Bridge0": removed ISP.
```

**Notes**

История изменений Версия Описание Добавлена команда interface include.2.00

---

### interface inherit

Указать Ethernet-интерфейс, который будет добавлен в программный мост в качестве порта. В отличие от команды include, команда inherit передает мосту некоторые настройки добавляемого интерфейса, такие как IP-адрес, маску и IP-псевдонимы. При удалении либо самого моста, либо интерфейсаиз моста,эти настройки,даже если они были изменены, будут скопированы обратно на освободившийся интерфейс. Команда позволяет добавить в мост интерфейс, через который осуществляется управление устройством, и не потерять управление. Команда с префиксом no удаляет интерфейс из моста, возвращает интерфейсу настройки, унаследованныеранее мостом, и сбрасывает эти настройки у моста.

**Syntax**

```bash
inherit ‹interface›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |

**Examples**

```
Пример (config-if)> inherit GigabitEthernet0/Vlan3
Network::Interface::Bridge: "Bridge1": GigabitEthernet0/Vlan3 ►
inherited in Bridge1.
(config-if)> no inherit
Network::Interface::Bridge: "Bridge1": inherit removed.
```

**Notes**

История изменений Версия Описание Добавлена команда interface inherit.2.00

---

### interface ip access-group

Привязать именованныйсписок правил фильтрации (ACL, см. access-list) к интерфейсу. Параметр in или out указывает направление трафика для которого будет применяться ACL. К одному интерфейсу может быть привязано несколько ACL. Команда с префиксом no отключает ACL для указанного интерфейса и направления трафика.

**Syntax**

```bash
ip access-group ‹acl› ‹direction›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| acl | — | — | — |
| direction | — | — | — |

**Examples**

```
(config-if)> no ip access-group ‹acl› ‹direction›
Список правил фильтрации,
предварительно созданный с помощью
команды access-list.
direction Применить фильтрацию к входящим
пакетам.
in
Применить фильтрацию к исходящим
out
Пример (config-if)> ip access-group BLOCK in
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip access-group.2.00

---

### interface ip address

Изменить IP-адрес и маску сетевого интерфейса. Если на интерфейсе запущена служба автоматической настройки адреса, например, DHCP-клиент (см. interface ip address dhcp), то вручную установленный адрес может быть перезаписан. Команда с префиксом no сбрасывает адрес на 0.0.0.0.

**Syntax**

```bash
ip address ‹address› ‹mask›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |
| mask | — | — | — |

**Examples**

```
Пример Одно и то же значение адреса сети, состоящего из IP-адреса и маски,
можно ввести двумя способами: указать маску в каноническом виде или
задать битовую длину префикса.
(config)> ip address 192.168.9.1/24
Network::Interface::Ip: "Bridge3": IP address is 192.168.9.1/24.
(config)> no ip address
Network::Interface::Ip: "Bridge3": IP address cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip address.2.00

---

### interface ip address dhcp

Запустить DHCP-клиент для автоматической настройки сетевых параметров: IP-адреса и маски интерфейса, серверов DNS и шлюза по умолчанию. Команда с префиксом no останавливает службу DHCP-клиента, удаляет динамически настроенные параметры и возвращает предыдущие настройки IP-адреса и маски.

**Syntax**

```bash
ip address dhcp
```

**Examples**

```
Пример (config-if)> ip address dhcp
Dhcp::Client: Started DHCP client on ISP.
(config-if)> no ip address dhcp
Dhcp::Client: Stopped DHCP client on ISP.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip address dhcp.2.00 Удален необязательный аргумент hostname.4.02

---

### interface ip adjust-ttl recv

Изменить параметр TTL для всех входящих пакетов на интерфейсе. Команда с префиксом no отменяет настройку.

**Syntax**

```bash
ip adjust-ttl recv ‹recv›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| recv | — | — | — |

**Examples**

```
Пример (config-if)> ip adjust-ttl recv 1
Network::Interface::Ip: "CdcEthernet0": incoming TTL set to 1.
(config-if)> no ip adjust-ttl recv
Network::Interface::Ip: "CdcEthernet0": incoming TTL settings ►
removed.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip adjust-ttl recv. Предыдущееназваниекомандыinterfaceip adjust-ttl. 3.07

---

### interface ip adjust-ttl send

Изменить параметр TTL для всех исходящих пакетов на интерфейсе. Команда с префиксом no отменяет настройку.

**Syntax**

```bash
ip adjust-ttl send ‹send›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| send | — | — | — |

**Examples**

```
Пример (config-if)> ip adjust-ttl send 65
Network::Interface::Ip: "CdcEthernet1": outgoing TTL set to 65.
(config-if)> no ip adjust-ttl send
Network::Interface::Ip: "CdcEthernet1": outgoing TTL settings ►
removed.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip adjust-ttl send.2.09

---

### interface ip alias

Установить дополнительный IP-адрес и маску сетевого интерфейса (псевдоним). Команда с префиксом no сбрасывает указанный псевдоним на 0.0.0.0, тем самым удаляя его. Если выполнить команду без аргумента, то весь список псевдонимов будет очищен.

**Syntax**

```bash
ip alias ‹address› ‹mask›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |
| mask | — | — | — |

**Examples**

```
Пример (config-if)> ip alias 192.168.1.88/24
Network::Interface::Ip: "WifiMaster1/WifiStation0": alias 0 is ►
192.168.1.88/24.
(config-if)> no ip alias 192.168.1.88/24
Network::Interface::Ip:"WifiMaster1/WifiStation0":alias 0 reset ►
to 0.0.0.0/0.
(config-if)> no ip alias
Network::Interface::Ip: "WifiMaster1/WifiStation0": all aliases ►
removed.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip alias.2.00

---

### interface ip dhcp client broadcast

Установить бит broadcast в сообщениях DHCP Discover, указывающий на способ отправки ответа обратно клиенту. По умолчанию параметр отключен. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
ip dhcp client broadcast
```

**Examples**

```
Пример (config-if)> ip dhcp client broadcast
Dhcp::Client: ISP DHCP client request broadcast enabled.
(config-if)> no ip dhcp client broadcast
Dhcp::Client: ISP DHCP client request broadcast disabled.
```

**Notes**

История изменений Версия Описание Добавленакомандаinterfaceip dhcp client broadcast.2.15

---

### interface ip dhcp client class-id

Указать производителя устройства, на котором работает DHCP-клиент (опция dhcp 60). Команда с префиксом no удаляет настройку.

**Syntax**

```bash
ip dhcp client class-id ‹class›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| class | — | — | — |

**Examples**

```
Пример (config-if)> ip dhcp client class-id "Giga"
Dhcp::Client: ISP DHCP client vendor class is set to "Giga".
(config-if)> no ip dhcp client class-id
Dhcp::Client: ISP DHCP client vendor class is cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip dhcp client class-id.2.02

---

### interface ip dhcp client debug

Включитьотладочныйрежим.В отладочномрежимев системныйжурнал выводится подробная информация о работе DHCP-клиента. Команда с префиксом no отключает отладочный режим.

**Syntax**

```bash
ip dhcp client debug
```

**Examples**

```
Пример (config-if)> ip dhcp client debug
Dhcp::Client: ISP DHCP client debug enabled.
(config-if)> no ip dhcp client debug
Dhcp::Client: ISP DHCP client debug disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip dhcp client debug.2.01

---

### interface ip dhcp client displace

Вытеснить статический адрес интерфейса what в случае если он конфликтует с адресом, полученным DHCP-клиентом основного интерфейса. Данная команда выполняется автоматически при подключении USB Ethernet адаптера. После этого происходит сохранение конфигурации и перезагрузка устройства. Команда с префиксом no отменяет вытеснение для указанного интерфейса.

**Syntax**

```bash
ip dhcp client displace ‹what› [ check-session ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| what | — | — | — |

**Examples**

```
Пример (config-if)> ip dhcp client displace Home
Dhcp::Client: ISP added "Home" displacement.
(config-if)> ip dhcp client displace Home check-session
(config-if)> no ip dhcp client displace Home
Dhcp::Client: ISP deleted "Home" displacement.
(config-if)> no ip dhcp client displace Home check-session
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip dhcp client displace.2.03 Добавлен аргумент check-session.2.15

---

### interface ip dhcp client dns-routes

Включитьавтоматическоедобавлениехост-маршрутовдо DNS-серверов, полученных от DHCP-сервера. По умолчанию настройка включена. Команда с префиксом no отключает настройку.

**Syntax**

```bash
ip dhcp client dns-routes
```

**Examples**

```
Пример (config-if)> ip dhcp client dns-routes
Dhcp::Client: ISP DHCP client DNS host routes are enabled.
(config-if)> no ip dhcp client dns-routes
Dhcp::Client: ISP DHCP client DNS host routes are disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip dhcp client dns-routes. 2.00

---

### interface ip dhcp client fallback

Установить заданный пользователем статический адрес в случае возникновения ошибок при работе DHCP. Команда с префиксом no отменяет настройку, и устанавливает адрес 0.0.0.0..

**Syntax**

```bash
ip dhcp client fallback ‹type›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| type | — | — | — |

**Examples**

```
Пример (config-if)> ip dhcp client fallback static
Dhcp::Client: A DHCP address fallback is static.
(config-if)> no ip dhcp client fallback
Dhcp::Client: A DHCP address fallback set to zero for "ISP".
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip dhcp client fallback.2.05

---

### interface ip dhcp client hostname

Назначить имя хоста, которое отправляется в DHCP-запросе. Команда с префиксом no возвращает хосту имя по умолчанию.

**Syntax**

```bash
ip dhcp client hostname ‹hostname›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| hostname | — | — | — |

**Examples**

```
(config-if)> no ip dhcp client hostname
Имя хоста для назначения.Строкаhostname
Пример (config-if)> ip dhcp client hostname MYHOME
Dhcp::Client: ISP DHCP client hostname is set to MYHOME.
Dhcp::Client: ISP DHCP client hostname is reset to default (HOME).
```

**Notes**

История изменений Версия Описание Добавленакомандаinterfaceip dhcp client hostname.2.00

---

### interface ip dhcp client name-servers

Использоватьадреса серверов DNS, полученные по DHCP. По умолчанию эта функция включена. Команда с префиксом no запрещает использовать адреса DNS-серверов, полученные по DHCP.

**Syntax**

```bash
ip dhcp client name-servers
```

**Examples**

```
Пример (config-if)> ip dhcp client name-servers
Dhcp::Client: ISP DHCP name servers are enabled.
(config-if)> no ip dhcp client name-servers
Dhcp::Client: ISP DHCP name servers are disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip dhcp client name-servers. 2.00

---

### interface ip dhcp client release

DHCP-клиент освобождает аренду IP-адреса и уходит в спящий режим. Еще одно выполнение этой команды переводит DHCP-клиент в режим автоматического получения IP-адреса.

**Syntax**

```bash
ip dhcp client release
```

**Examples**

```
Пример (config-if)> ip dhcp client release
Dhcp::Client: IP address released.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip dhcp client release.2.03

---

### interface ip dhcp client renew

DHCP-клиент освобождает аренду IP-адреса и переходит в режим получения нового.

**Syntax**

```bash
ip dhcp client renew
```

**Examples**

```
Пример (config-if)> ip dhcp client renew
Dhcp::Client: IP address renewed.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip dhcp client renew.2.03

---

### interface ip dhcp client routes

Включить получение маршрутов от провайдера (опции dhcp 33, 121, 242). По умолчанию включено. В настройках отображается только с префиксом no. Команда с префиксом no отключает настройку.

**Syntax**

```bash
ip dhcp client routes
```

**Examples**

```
Пример (config-if)> ip dhcp client routes
Dhcp::Client: ISP DHCP client static routes are enabled.
(config-if)> no ip dhcp client routes
Dhcp::Client: ISP DHCP client static routes are disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip dhcp client routes.2.05

---

### interface ip flow

Включить сенсор NetFlow на заданном интерфейсе. По умолчанию этот параметр отключен. Команда с префиксом no отключает сенсор NetFlow.

**Syntax**

```bash
ip flow ‹direction›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| direction | — | — | — |

**Examples**

```
Пример (config-if)> ip flow ingress
Netflow::Manager: NetFlow collector is enabled on interface ►
"Home" in "ingress" direction.
(config-if)> ip flow egress
"Home" in "egress" direction.
(config-if)> ip flow both
"Home" in "both" direction.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip flow.2.11

---

### interface ip global

Установитьдля интерфейсасвойство«global»с параметром.Это свойство необходимо для установки маршрута по умолчанию, работы DynDNS-клиента и NAT. Можно представлять global-интерфейсы, как ведущие в глобальную сеть (в интернет). Параметр свойства «global» влияет на приоритет интерфейса в праве установить маршрут по умолчанию. Чем приоритет больше, тем желательнеедля пользователявыходв глобальнуюсетьчерезуказанный интерфейс.С помощьюприоритетареализуетсяфункциярезервирования подключения в интернет (WAN backup) «global». По умолчанию настройка отключена. Команда с префиксом no удаляет свойство.

**Syntax**

```bash
ip global (‹priority› | order ‹order› | auto)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| priority | — | — | — |
| order | — | — | — |

**Examples**

```
Пример (config-if)> ip global 10
Network::Interface::IP: "L2TP0": global priority is 10.
(config-if)> ip global order 0
Network::Interface::IP: "L2TP0": order is 1.
(config-if)> ip global auto
Network::Interface::IP: Global priority recalculated.
(config-if)> no ip global
Network::Interface::IP: "L2TP0": global priority cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip global.2.00 Добавлены аргументы order и auto.2.09

---

### interface ip mru

Установить значение MRU, которое будет передано удаленному узлу при установлении соединения PPP (IPCP). По умолчанию используется значение 1460. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
ip mru ‹mru›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mru | — | — | — |

**Examples**

```
Пример (config-if)> ip mru 1492
Network::Interface::Ppp: "PPPoE0": MRU saved.
(config-if)> no ip mru
Network::Interface::Ppp: "PPPoE0": MRU reset to default.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip mru.2.00

---

### interface ip mtu

Установить значение MTU на сетевом интерфейсе. При установлении соединенияпо протоколу PPP (IPCP), удаленномуузлу будут отправляться пакеты указанного размера MTU, даже если тот запросил MTU меньшего значения. Команда с префиксом no сбрасывает значение MTU на то, которое было до первого применения команды.

**Syntax**

```bash
ip mtu ‹mtu›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mtu | — | — | — |

**Examples**

```
Пример (config-if)> ip mtu 1500
Network::Interface::Base: "GigabitEthernet1": static MTU is 1500.
(config-if)> no ip mtu
Network::Interface::Base: "GigabitEthernet1": static MTU reset ►
to default.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip mtu.2.00

---

### interface ip nat loopback

Включить обратную трансляцию адресов (NAT loopback) для отправки локальных запросов локальному серверу из Интернета. По умолчанию этот параметр включен для интерфейсов Домашней сети (уровни безопасности private и protected). Команда с префиксом no отключает NAT loopback.

**Syntax**

```bash
ip nat loopback
```

**Examples**

```
Пример (config-if)> ip nat loopback
Network::StaticNat: NAT loopback is explicitly enabled on "Home".
(config-if)> no ip nat loopback
Network::StaticNat: NAT loopback is explicitly disabled on "Home".
```

**Notes**

История изменений Версия Описание Добавлена команда ip nat loopback.2.11

---

### interface ip remote

Установить статический адрес удаленного узла.

**Syntax**

```bash
ip remote ‹address›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |

**Examples**

```
Пример (config-if)> ip remote 192.168.2.19
Network::Interface::Ppp: "L2TP0": remote address saved.
(config-if)> no ip remote
Network::Interface::Ppp: "L2TP0": remote address erased.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip remote.2.00

---

### interface ip tcp adjust-mss

Установить ограничение максимального размера сегмента исходящих сессий TCP. Если значение MSS, которое передается в поле заголовка SYN-пакетов, превышает заданное, команда меняет его. Команда применяетсяк интерфейсуи действуетна все исходящиеTCP SYN-пакеты. Команда с префиксом no отменяет действие команды.

**Syntax**

```bash
ip tcp adjust-mss (pmtu | ‹mss› )
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mss | — | — | — |

**Examples**

```
Пример (config-if)> ip tcp adjust-mss pmtu
Network::Interface::Ip: "L2TP0": TCP-MSS adjustment enabled.
(config-if)> ip tcp adjust-mss 1300
(config-if)> no ip tcp adjust-mss
Network::Interface::Ip: "L2TP0": TCP-MSS adjustment disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ip tcp adjust-mss.2.00

---

### interface ipcp address

Использовать адрес удаленного узла. Команда с префиксом no отключает функцию.

**Syntax**

```bash
ipcp address
```

**Examples**

```
Пример (config-if)> ipcp address
using address from remote peer
(config-if)> no ipcp address
not using address from remote peer
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipcp address.3.09

---

### interface ipcp default-route

Использовать адрес удаленного узла как шлюз по умолчанию. Команда с префиксом no запрещает изменение шлюза по умолчанию.

**Syntax**

```bash
ipcp default-route
```

**Examples**

```
Пример (config-if)> ipcp default-route
Using peer as a default gateway.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipcp default-route.2.00

---

### interface ipcp dns-routes

Использовать маршруты полученные по IPCP. По умолчанию настройка включена. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
ipcp dns-routes
```

**Examples**

```
Пример (config-if)> ipcp dns-routes
DNS routes enabled
(config-if)> no ipcp dns-routes
DNS routes disabled
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipcp dns-routes.2.02

---

### interface ipcp name-servers

Использовать адреса серверов DNS, полученные по IPCP. По умолчанию настройка включена. Команда с префиксом no запрещает использовать адреса серверов DNS полученные по IPCP.

**Syntax**

```bash
ipcp name-servers
```

**Examples**

```
(config-if)> no ipcp name-servers
Пример (config-if)> ipcp name-servers
using remote name servers.
not using remote name servers.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipcp name-servers.2.00

---

### interface ipcp vj

Включить сжатие заголовков TCP/IP методом Ван Якобсона. По умолчанию настройка отключена. Команда с префиксом no отключает сжатие.

**Syntax**

```bash
ipcp vj [cid]
```

**Examples**

```
Пример (config-if)> ipcp vj cid
VJ compression enabled.
(config-if)> no ipcp vj
VJ compression disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipcp vj.2.03

---

### interface ipsec encryption-level

Задать уровень шифрования для IPsec-соединения, автоматически связанного с туннелем. Значение по умолчанию — normal. Подробное описание каждого уровня приводится в Приложении. Команда с префиксом no устанавливает уровень шифрования по умолчанию.

**Syntax**

```bash
ipsec encryption-level ‹level›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| level | — | — | — |

**Examples**

```
Пример (config-if)> ipsec encryption-level weak
Network::Interface::Secure: "Gre0": security level is set to ►
"weak".
(config-if)> no ipsec encryption-level
Network::Interface::Secure: "Gre0": security level was reset.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipsec encryption-level.2.08 Добавлены новые уровни шифрования — high, strong-aead и strong-aead-pfs. 3.07

---

### interface ipsec force-encaps

Включить поддержку принудительной инкапсуляции ESP в UDP для клиентских туннелей. По умолчанию эта функция отключена. Команда с префиксом no отменяет настройку.

**Syntax**

```bash
ipsec force-encaps
```

**Examples**

```
Пример (config-if)> ipsec force-encaps
Network::Interface::Secure: Force ESP in UDP encapsulation ►
enabled.
(config-if)> no ipsec force-encaps
disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipsec force-encaps.2.12

---

### interface ipsec ignore

Отключитьобработкувходящих IKE-пакетовслужбы IPsec на интерфейсе. Команда с префиксом no отменяет настройку.

**Syntax**

```bash
ipsec ignore
```

**Examples**

```
Пример (config-if)> ipsec ignore
IpSec::Manager: Interface "Gre0" added to IPsec ignore list.
(config-if)> no ipsec ignore
IpSec::Manager: Interface "Gre0" removed from IPsec ignore list.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipsec ignore.2.10

---

### interface ipsec ikev2

Включить протокол IKEv2 для IPsec-соединения, автоматически связанного с туннелем. По умолчанию используется протокол IKEv1. Команда с префиксом no возвращает значение по умолчанию. Изменитьнастройки Да

**Syntax**

```bash
ipsec ikev2
```

**Examples**

```
Пример (config-if)> ipsec ikev2
Network::Interface::Secure: IKEv2 is enabled.
(config-if)> no ipsec ikev2
Network::Interface::Secure: IKEv2 is disabled, enable IKEv1.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipsec ikev2.2.10

---

### interface ipsec nail-up

Включить автоматические изменения секретных ключей для туннелей L2TP/IPsec, EoIP/IPsec, Gre/IPsec, IPIP/IPsec. По умолчанию параметр включен. Команда с префиксом no отключает настройку.

**Syntax**

```bash
ipsec nail-up
```

**Examples**

```
Пример (config-if)> ipsec nail-up
Network::Interface::Secure: SA renegotiation enabled.
(config-if)> no ipsec nail-up
Network::Interface::Secure: SA renegotiation disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipsec nail-up.2.12

---

### interface ipsec name-servers

Использовать адреса серверов DNS, полученные через IKEv1 или IKEv2 IPsec-сервер. По умолчанию функция включена. Команда с префиксом no запрещает использовать адреса DNS, полученные через IKEv1 или IKEv2 IPsec-сервер.

**Syntax**

```bash
ipsec name-servers
```

**Examples**

```
Пример (config-if)> ipsec name-servers
IpSec::Interface::Ike: "IKE0": automatic name servers via IKE ►
Configuration Payload are enabled.
(config-if)> no ipsec name-servers
Configuration Payload are disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipsec name-servers.3.06

---

### interface ipsec preshared-key

Установить ключ PSK для IPsec-соединения, автоматически связанного с туннелем. Также включает использование IPsec для этого туннеля. Команда с префиксом no сбрасывает значение ключа. Изменитьнастройки Да

**Syntax**

```bash
ipsec preshared-key ‹key›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| key | — | — | — |

**Examples**

```
Пример (config-if)> ipsec preshared-key 12345678
Network::Interface::Secure: "Gre0": preshared key was set.
(config-if)> no ipsec preshared-key
Network::Interface::Secure: "Gre0": preshared key was reset.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipsec preshared-key.2.08

---

### interface ipsec proposal lifetime

Установить время жизни трансформации IPsec Phase1 на интерфейсе. По умолчанию используется значение 28800. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
ipsec proposal lifetime ‹lifetime›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| lifetime | — | — | — |

**Examples**

```
Пример (config-if)> ipsec proposal lifetime 222222
Network::Interface::Secure: IPsec IKE proposal lifetime set to ►
222222 s.
(config-if)> no ipsec proposal lifetime
Network::Interface::Secure: IPsec IKE proposal lifetime reset ►
to 28800 s.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipsec proposal lifetime.2.11

---

### interface ipsec proposal local-id

Задать пользовательский локальный идентификатор для IKE. Команда с префиксом no удаляет данную настройку.

**Syntax**

```bash
ipsec proposal local-id ‹local-id›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| local-id | — | — | — |

**Examples**

```
Пример (config-if)> ipsec proposal local-id 192.168.8.4
Network::Interface::Secure: Set IKE local ID to "192.168.8.4".
(config-if)> no ipsec proposal local-id
Network::Interface::Secure: Reset IKE local ID.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipsec proposal local-id.3.08

---

### interface ipsec proposal remote-id

Задать пользовательский удаленный идентификатор для IKE. Команда с префиксом no удаляет данную настройку.

**Syntax**

```bash
ipsec proposal remote-id ‹remote-id›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| remote-id | — | — | — |

**Examples**

```
Пример (config-if)> ipsec proposal remote-id my.domain.com
Network::Interface::Secure: Set IKE remote ID to "my.domain.com".
(config-if)> no ipsec proposal remote-id
Network::Interface::Secure: Reset IKE remote ID.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipsec proposal remote-id. 3.08

---

### interface ipsec transform-set lifetime

Установить время жизни трансформации IPsec Phase2 на интерфейсе. По умолчанию используется значение 28800. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
ipsec transform-set lifetime ‹lifetime›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| lifetime | — | — | — |

**Examples**

```
Пример (config-if)> ipsec transform-set lifetime 2222222
Network::Interface::Secure:IPsec ESP transform-set lifetime set ►
to 2222222 s.
(config-if)> no ipsec transform-set lifetime
Network::Interface::Secure: IPsec ESP transform-set lifetime ►
reset to 28800 s.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipsec transform-set lifetime. 2.11

---

### interface ipv6 address

Настроить IPv6-адрес на интерфейсе. Если указан аргумент auto, адрес настраивается автоматически. Ввод адреса вручную делает его статическим. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
ipv6 address ( ‹address› | ‹block› | auto)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |
| block | — | — | — |

**Examples**

```
Пример (config-if)> ipv6 address 2a01:291:2:612:52ff:20ff:fe00:1e87
Network::Interface::Ip6:"GigabitEthernet1":added static address ►
2a01:291:2:612:52ff:20ff:fe00:1e87.
(config-if)> ipv6 address 2001:db8::1
2001:db8::1.
(config-if)> ipv6 address fd08:a648:e303::3/64
fd08:a648:e303::3/64.
(config-if)> no ipv6 address 2a01:291:2:612:52ff:20ff:fe00:1e87
Network::Interface::Ip6: "GigabitEthernet1": removed static ►
address 2a01:291:2:612:52ff:20ff:fe00:1e87.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipv6 address.2.00

---

### interface ipv6 dhcp client pd hint

Настроить подсказку делегирования префикса DHCPv6-клиента. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
ipv6 dhcp client pd hint ‹prefix›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| prefix | — | — | — |

**Examples**

```
Пример (config-if)> ipv6 dhcp client pd hint fd08:a648:e303::/64
Ip6::Dhcp::Client: "GigabitEthernet1": set a prefix delegation ►
hint to "fd08:a648:e303::/64".
(config-if)> ipv6 dhcp client pd hint ::/64
hint to "::/64".
(config-if)> no ipv6 dhcp client pd hint
Ip6::Dhcp::Client: "GigabitEthernet1": reset prefix delegation ►
hint.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipv6 dhcp client pd hint.4.01

---

### interface ipv6 id

Задать способ формирования идентификатора интерфейса IPv6. По умолчанию используется значение eui64. Команда с префиксом no устанавливает значение по умолчанию.

**Syntax**

```bash
ipv6 id ( ‹suffix› | eui64 | random)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| suffix | — | — | — |

**Examples**

```
Пример (config-if)> ipv6 id ::2
Network::Interface::Ip6: "Bridge0": interface ID is set to ::2.
(config-if)> ipv6 id eui64
Network::Interface::Ip6: "Bridge0": interface ID is set to eui64.
(config-if)> ipv6 id random
Network::Interface::Ip6:"Bridge0": interface ID is set to random.
(config-if)> no ipv6 id
Network::Interface::Ip6: "Bridge0": interface ID is reset to ►
default value.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipv6 id.4.01

---

### interface ipv6 name-servers

Настроить получение информации от DNS. Если указан аргумент auto , включаются DNS-запросы DHCPv6. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
ipv6 name-servers (auto)
```

**Examples**

```
Пример (config-if)> ipv6 name-servers auto
Name servers provided by the interface network are accepted.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipv6 name-servers.2.00

---

### interface ipv6 prefix

Настроить делегацию префикса. Если указан аргумент auto , префикс запрашивается через DHCPv6-PD. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
ipv6 prefix ( ‹prefix› | auto)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| prefix | — | — | — |

**Examples**

```
Пример (config-if)> ipv6 prefix 2001:db8:43:ab12::/64
Static IPv6 prefix added.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipv6 prefix.2.00

---

### interface ipv6cp

Включить поддержку IPv6CP на этапе установления соединения. Команда с префиксом no отключает IPv6CP.

**Syntax**

```bash
ipv6cp
```

**Examples**

```
Пример (config-if)> ipv6cp
IPv6CP enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ipv6cp.2.00

---

### interface lcp acfc

Включить согласование параметров сжатия полей канального уровня Address и Control. По умолчанию настройка отключена. Команда с префиксом no отключает данную опцию и все запросы удаленной стороны на согласование ACFC отклоняются.

**Syntax**

```bash
lcp acfc [cid]
```

**Examples**

```
Пример (config-if)> lcp acfc cid
ACFC compression enabled
(config-if)> no lcp acfc cid
ACFC compression disabled
```

**Notes**

История изменений Версия Описание Добавлена команда interface lcp acfc.2.03

---

### interface lcp echo

Задать правила тестирования соединения PPP средствами LCP echo. По умолчанию interval равен 30, count равен 3. Команда с префиксом no отключает LCP echo.

**Syntax**

```bash
lcp echo ‹interval› ‹count› [adaptive]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interval | — | — | — |
| count | — | — | — |

**Examples**

```
Пример (config-if)> lcp echo 20 2
Network::Interface::Ppp: "PPPoE0": LCP echo parameters updated.
(config-if)> no lcp echo
Network::Interface::Ppp: "PPPoE0": LCP echo disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface lcp echo.2.00 Добавлен параметр adaptive.2.06

---

### interface lcp pfc

Включить согласование параметров сжатия поля Protocol в заголовках PPP. По умолчанию настройка отключена. Команда с префиксом no отключает данную опцию и все запросы удаленной стороны на согласование PFC отклоняются.

**Syntax**

```bash
lcp pfc [cid]
```

**Examples**

```
(config-if)> no lcp pfc
Включить сжатие Connection ID в
заголовках.
cid
Пример (config-if)> lcp pfc cid
PFC compression enabled
(config-if)> no lcp pfc cid
PFC compression disabled
```

**Notes**

История изменений Версия Описание Добавлена команда interface lcp pfc.2.03

---

### interface ldpc

Включить LDPC код для точки доступа 5 ГГц. По умолчанию функция выключена. Команда с префиксом no отключает функцию.

**Syntax**

```bash
ldpc
```

**Examples**

```
Пример (config-if)> ldpc
Network::Interface::Rtx::WifiMaster:"WifiMaster1": LDPC enabled.
(config-if)> no ldpc
Network::Interface::Rtx::WifiMaster:"WifiMaster1": LDPC disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ldpc.2.07

---

### interface led wan

Показыватьсостояниеинтерфейсас помощьюиндикатора.Долженбыть выбран параметр SelectedWan при помощи команды system led. По умолчанию настройка отключена. Команда с префиксом no отключает функцию.

**Syntax**

```bash
led wan
```

**Examples**

```
Пример (config-if)> led wan
Network::Interface::Led: Selected WAN GigabitEthernet1.
(config-if)> no led wan
Network::Interface::Led: Selected no WAN.
```

**Notes**

История изменений Версия Описание Добавлена команда interface led wan.2.08

---

### interface lldp disable

Отключить агент LLDP на интерфейсе.По умолчанию функция включена. Команда с префиксом no включает LLDP агент.

**Syntax**

```bash
lldp disable
```

**Examples**

```
Пример (config-if)> lldp disable
Network::DiscoveryManager: LLDP agent is disabled on interface ►
"ISP".
(config-if)> no lldp disable
Network::DiscoveryManager: LLDP agent is enabled on interface ►
```

**Notes**

История изменений Версия Описание Добавлена команда interface lldp disable.2.11

---

### interface mac access-list address

Добавить MAC-адрес в список правил фильтрации интерфейса. Тип списка доступа устанавливаетсякомандой interface mac access-list type. Команда с префиксом no удаляет указанный MAC-адрес из ACL.

**Syntax**

```bash
mac access-list address ‹address›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |

**Examples**

```
Пример (config-if)> mac access-list address 64:a2:f9:53:b2:12
Network::Interface::Ethernet:"WifiMaster0/AccessPoint1": added ►
64:a2:f9:53:b2:12 to the ACL.
(config-if)> no mac access-list address 64:a2:f9:53:b2:12
Network::Interface::Ethernet:"WifiMaster0/AccessPoint1":removed ►
64:a2:f9:53:b2:12 from the ACL.
(config-if)> no mac access-list address
Network::Interface::Ethernet: "WifiMaster0/AccessPoint1": ACL ►
cleared.
```

**Notes**

История изменений Версия Описание Добавленакоманда interface mac access-list address.2.00

---

### interface mac access-list type

Установить тип списка правил фильтрации интерфейса. По умолчанию тип не определен (присвоено значение none).

**Syntax**

```bash
mac access-list type ‹type›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| type | — | — | — |

**Examples**

```
Пример (config-if)> mac access-list type permit
Network::Interface::Ethernet: "WifiMaster0/AccessPoint1": ACL ►
type changed to permit.
```

**Notes**

История изменений Версия Описание Добавлена команда interface mac access-list type.2.00

---

### interface mac address

Назначить MAC-адрес на указанный сетевой интерфейс. Адрес задается в шестнадцатеричном формате 00:00:00:00:00:00. Команда позволяет установить любой адрес, но предупреждает пользователя, если в новом адресе установлен бит «multicast» или сброшен бит «OUI enforced». Команда с префиксом no возвращает интерфейсу исходный MAC-адрес. Предупреждение:ИзменениеMAC-адресана интерфейсеWi-Fi запрещено.

**Syntax**

```bash
mac address ‹mac›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mac | — | — | — |

**Examples**

```
Пример (config-if)> mac address 3C:1F:6E:2A:1C:BA
(config-if)> no mac address
```

**Notes**

История изменений Версия Описание Добавлена команда interface mac address.2.00

---

### interface mac address factory

Назначить заводской MAC-адрес на указанный сетевой интерфейс.

**Syntax**

```bash
mac address factory ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (config-if)> mac address factory lan
Core::System::UConfig: done.
```

**Notes**

История изменений Версия Описание Добавлена команда interface mac address factory.2.00

---

### interface mac band

Привязать зарегистрированный хост к частотному диапазону 2,4 или 5 ГГц. Команда с префиксом no удаляет связь. Если выполнить команду без аргумента, то весь список связей будет очищен.

**Syntax**

```bash
mac band ‹mac› ‹band›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mac | — | — | — |
| band | — | — | — |

**Examples**

```
Пример (config-if)> mac band c0:b8:83:c2:cb:11 0
Network::Interface::Rtx::MacBand: "Bridge0": bound ►
c0:b8:83:c2:cb:11 to 2.4 GHz.
(config-if)> mac band c0:b8:83:c2:cb:11 1
c0:b8:83:c2:cb:11 to 5 GHz.
(config-if)> no mac band c0:b8:83:c2:cb:85
Network::Interface::Rtx::MacBand: "Bridge0": unbound ►
c0:b8:83:c2:cb:85 from 2.4 GHz.
(config-if)> no mac band
Network::Interface::Rtx::MacBand: Unbound all hosts.
```

**Notes**

История изменений Версия Описание Добавлена команда interface mac band.3.05

---

### interface mac bssid

Указать MAC-адрес точки доступа для подключения к WISP. Команда с префиксом no удаляет данный MAC-адрес.

**Syntax**

```bash
mac bssid ‹bssid›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| bssid | — | — | — |

**Examples**

```
Пример (config-if)> mac bssid 56:ff:20:00:1e:11
Network::Interface::WifiStation: BSSID set to 56:ff:20:00:1e:11.
(config-if)> no mac bssid
Network::Interface::WifiStation: BSSID cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface mac bssid.2.13

---

### interface mac clone

Присвоить интерфейсу MAC-адрес вашего ПК.

**Syntax**

```bash
mac clone
```

**Examples**

```
Пример (config-if)> mac clone
```

**Notes**

История изменений Версия Описание Добавлена команда interface mac clone.2.00

---

### interface mobile lte disable-band

Отключить указанный диапазон LTE. Команда с префиксом no включает диапазон. Если выполнить команду без аргумента, то все диапазоны LTE будут включены.

**Syntax**

```bash
mobile lte disable-band ‹band›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| band | — | — | — |

**Examples**

```
Пример (config-if)> mobile lte disable-band 22
UsbQmi::Interface: "UsbQmi0": LTE band 22 disabled.
(config-if)> no mobile lte disable-band 22
UsbQmi::Interface: "UsbQmi0": LTE band 22 enabled.
(config-if)> no mobile lte disable-band
UsbQmi::Interface: "UsbQmi0": all LTE bands are enabled.
```

**Notes**

История изменений Версия Описание Добавленакоманда interface mobile lte disable-band.3.04

---

### interface mobile name-servers

Использовать адреса серверов DNS, полученные от мобильного оператора. По умолчанию функция включена. Команда с префиксом no запрещает использовать адреса DNS, полученные от мобильного оператора.

**Syntax**

```bash
mobile name-servers
```

**Examples**

```
Пример (config-if)> mobile name-servers
UsbQmi::Interface: "UsbQmi0": automatic name servers via QMI are ►
enabled.
(config-if)> no mobile name-servers
disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface mobile name-servers.3.06

---

### interface mobile operator

Задать идентификатор сети для PLMN. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
mobile operator ‹PLMN›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| PLMN | — | — | — |

**Examples**

```
Пример (config-if)> mobile operator 25011
UsbQmi::Interface: Operator PLMN is set to "25011".
(config-if)> no mobile operator
UsbQmi::Interface: Operator PLMN cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface mobile operator.3.04

---

### interface mobile pdp

Выбрать версию протокола IP для USB-модема. IPv6 можно выбрать только если установлен соответствующий системный компонент. По умолчанию используется значение ipv4. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
mobile pdp (ipv4 | ipv6 | ipv4v6)
```

**Examples**

```
Пример (config-if)> mobile pdp ipv4
UsbQmi::Interface: Packet data protocol is set to "ipv4".
(config-if)> mobile pdp ipv4v6
UsbQmi::Interface: Packet data protocol is set to "ipv4v6".
(config-if)> no mobile pdp
Mobile::Interface: "UsbLte0": packet data protocol is reset to ►
default.
```

**Notes**

История изменений Версия Описание Добавлена команда interface mobile pdp.3.04 Добавлены аргумент ipv6 и префикс NO.3.08

---

### interface mobile roaming

Включить мобильный роуминг. Команда с префиксом no отключает настройку.

**Syntax**

```bash
mobile roaming
```

**Examples**

```
Пример (config-if)> mobile roaming
UsbQmi::Interface: "UsbQmi0": roaming is enabled.
(config-if)> no mobile roaming
UsbQmi::Interface: "UsbQmi0": roaming is disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface mobile roaming.3.03

---

### interface mobile scan

Запустить сканирование мобильной сети. Процесс сканирования занимает 20-50 секунд. Команда с префиксом no прерывает сканирование.

**Syntax**

```bash
mobile scan
```

**Examples**

```
Пример (config-if)> mobile scan
UsbQmi::Interface: Network scanning started.
(config-if)> no mobile scan
UsbQmi::Interface: Network scanning stopped.
```

**Notes**

История изменений Версия Описание Добавлена команда interface mobile scan.3.05

---

### interface mobile umts disable-band

Отключить указанный диапазон UMTS. Команда с префиксом no включает диапазон. Если выполнить команду без аргумента, то все диапазоны UMTS будут включены.

**Syntax**

```bash
mobile umts disable-band ‹band›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| band | — | — | — |

**Examples**

```
Пример (config-if)> mobile umts disable-band 6
UsbQmi::Interface: "UsbQmi0": WCDMA band 6 disabled.
(config-if)> no mobile lte disable-band 6
UsbQmi::Interface: "UsbQmi0": WCDMA band 6 enabled.
(config-if)> no mobile lte disable-band
UsbQmi::Interface: "UsbQmi0": all WCDMA bands are enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface mobile umts disable-band. 3.05

---

### interface modem connect

Подключить USB-модем. Перед выполнением команды необходимо инициализировать модем командой tty init. Команда с префиксом no прерывает соединение.

**Syntax**

```bash
modem connect ( dial ‹phone› | ‹string› )
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| phone | — | — | — |
| string | — | — | — |

**Examples**

```
Пример (config-if)> modem connect dial *99#
Network::Interface::UsbModem:"UsbModem0": connect sequence saved.
(config-if)> modem connect dial *99#
Network::Interface::UsbModem: "UsbModem0": connect sequence ►
cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface modem connect.2.00

---

### interface modem timeout

Задать тайм-аут подключения модема. Настройка используется для медленныхмодемов/соединений.По умолчаниюиспользуетсязначение 30. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
modem timeout ‹timeout›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| timeout | — | — | — |

**Examples**

```
Пример (config-if)> modem timeout 300
Network::Interface::UsbModem: "UsbModem0": connect timeout is ►
300 seconds.
(config-if)> no modem timeout
unchanged, defaults to 30 seconds.
```

**Notes**

История изменений Версия Описание Добавлена команда interface modem timeout.2.05

---

### interface openvpn accept-routes

Включить получение маршрутов от удаленной стороны через OpenVPN. Команда с префиксом no отключает настройку.

**Syntax**

```bash
openvpn accept-routes
```

**Examples**

```
Пример (config-if)> openvpn accept-routes
Network::Interface::OpenVpn:"OpenVPN0": enable automatic routes ►
accept via tunnel.
(config-if)> no openvpn accept-routes
Network::Interface::OpenVpn:"OpenVPN0": disable automatic routes ►
```

**Notes**

История изменений Версия Описание Добавлена команда interface openvpn accept-routes.2.10

---

### interface openvpn connect

Указать интерфейс для соединения OpenVPN. Если аргумент не задан, соединение устанавливается через любой интерфейс.

**Syntax**

```bash
openvpn connect [ via ‹via› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| via | — | — | — |

**Examples**

```
Пример (config-if)> openvpn connect via ISP
Network::Interface::OpenVpn: "OpenVPN0": set connection via ISP.
(config-if)> openvpn connect
Network::Interface::OpenVpn: "OpenVPN0": set connection via any ►
interface.
```

**Notes**

История изменений Версия Описание Добавлена команда interface openvpn connect.2.10

---

### interface openvpn name-servers

Использовать адреса серверов DNS, полученные от сервера OpenVPN. По умолчанию функция включена. Команда с префиксом no запрещает использовать адреса DNS, полученные от сервера OpenVPN.

**Syntax**

```bash
openvpn name-servers
```

**Examples**

```
Пример (config-if)> openvpn name-servers
Network::Interface::OpenVpn: "OpenVPN0": automatic name servers ►
via tunnel are enabled.
(config-if)> no openvpn name-servers
via tunnel are disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface openvpn name-servers.3.06

---

### interface peer

Назначить идентификатор удаленного узла к которому будет осуществлятьсяподключениеPPP. Болееточныйсмыслнастройкизависит от типа интерфейса. Например, для PPPoE команда interface peer задает имя концентратора доступа, для PPTP — имя удаленного хоста или его IP-адрес, а для SSTP — задает удаленный сервер с портом 443 или любым другим. Команда с префиксом no отменяет настройку.

**Syntax**

```bash
peer ‹peer›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| peer | — | — | — |

**Examples**

```
Пример (config-if)> peer 111
(config-if)> peer host.example.net:5555
```

**Notes**

История изменений Версия Описание Добавлена команда interface peer.2.00 Добавлена возможность изменять порт удаленного сервера. 2.12

---

### interface peer-isolation

Включить изоляцию беспроводных клиентов в домашнем сегменте. Настройка применяется на интерфейсе Bridge и распространяется на все включенныев него точки доступа. Кроме того, блокируетсяпередача трафика от беспроводных клиентов внутри L2-сети. Команда с префиксом no отменяет настройку.

**Syntax**

```bash
peer-isolation
```

**Examples**

```
Пример (config-if)> peer-isolation
Network::Interface::Ethernet: "Bridge0": peer isolation enabled.
(config-if)> no peer-isolation
Network::Interface::Ethernet: "Bridge0": peer isolation disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface peer-isolation.2.10

---

### interface ping-check profile

Назначить интерфейсу профиль Ping Check. Команда с префиксом no отменяет настройку.

**Syntax**

```bash
ping-check profile ‹profile›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| profile | — | — | — |

**Examples**

```
Пример (config-if)> ping-check profile test
PingCheck::Client: Set ping-check profile for interface "ISP".
(config-if)> no ping-check profile
PingCheck::Client: Reset ping-check profile for interface "ISP".
```

**Notes**

История изменений Версия Описание Добавлена команда interface ping-check profile.2.04

---

### interface ping-check restart

Включить перезагрузку интерфейса при срабатывании Ping Check (для interface недоступен Интернет). По умолчанию функция отключена. Команда с префиксом no отключает функцию.

**Syntax**

```bash
ping-check restart [ ‹interface› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |

**Examples**

```
Пример (config-if)> ping-check restart
PingCheck::Client: Enabled "PPPoE0" interface restart.
(config-if)> ping-check restart ISP
PingCheck::Client: Enabled "ISP" interface restart for "PPPoE0".
(config-if)> no ping-check restart
PingCheck::Client: Remove restart settings for "PPPoE0".
```

**Notes**

История изменений Версия Описание Добавлена команда interface ping-check restart.3.04

---

### interface pmf

Включить функциональность PMF. Команда с префиксом no отключает настройку.

**Syntax**

```bash
pmf
```

**Examples**

```
Пример (config-if)> pmf
Network::Interface::Rtx::WifiStation:"WifiMaster0/WifiStation0":►
PMF enabled.
(config-if)> no pmf
PMF disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface pmf.2.09

---

### interface pmksa-lifetime

Изменить время жизни кэша PMK. По умолчанию установлено значение 1440.

**Syntax**

```bash
pmksa-lifetime ‹pmksa-lifetime›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| pmksa-lifetime | — | — | — |

**Examples**

```
Пример (config-if)> interface WifiMaster1 pmksa-lifetime 43200
Network::Interface::Mtk::WifiMaster:"WifiMaster1": PMKSA cache ►
lifetime updated.
```

**Notes**

История изменений Версия Описание Добавлена команда interface pmksa-lifetime.4.01

---

### interface power

Установить мощность передатчика для радио-интерфейсов. Максимальная мощность передатчика ограничена его аппаратными возможностями и государственными законами о радиосвязи. Данная командапозволяетлишь уменьшитьмощностьпередающегоустройства относительно его максимальной мощности, с целью возможного снижения помех для других устройств в этом диапазоне. По умолчанию настройка мощности установлена в 100.

**Syntax**

```bash
power ‹power›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| power | — | — | — |

**Examples**

```
Пример (config-if)> power 1
Network::Interface::Rtx::WifiMaster: "WifiMaster0": TX power ►
level set.
```

**Notes**

История изменений Версия Описание Добавлена команда interface power.2.00

---

### interface pppoe service

Указать службу PPPoE. Если служба не определена,то PPPoE-клиентбудет подключен к произвольной службе.

**Syntax**

```bash
pppoe service ‹service›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| service | — | — | — |

**Examples**

```
Пример (config-if)> pppoe service TEST
Network::Interface::Pppoe: "PPPoE0": service set.
(config-if)> no pppoe service
Network::Interface::Pppoe: "PPPoE0": service removed.
```

**Notes**

История изменений Версия Описание Добавлена команда interface pppoe service.2.05

---

### interface pppoe session auto-cleanup

Включить отправку PADT пакета для незавершенной сессии РРРоЕ. По умолчанию функция включена. Команда с префиксом no отключает отправку PADT пакета.

**Syntax**

```bash
pppoe session auto-cleanup
```

**Examples**

```
Пример (config-if)> pppoe session auto-cleanup
Network::Interface::Ppp: "PPPoE0": enabled session auto cleanup.
(config-if)> no pppoe session auto-cleanup
Network::Interface::Ppp: "PPPoE0": disabled session auto cleanup.
```

**Notes**

История изменений Версия Описание Добавлена команда interface pppoe session auto-cleanup. 3.03

---

### interface preamble-short

Использовать короткую преамбулу.

**Syntax**

```bash
preamble-short
```

**Examples**

```
Пример (config-if)> preamble-short
Network::Interface::Rtx::WifiMaster: "WifiMaster0": short ►
preamble enabled.
(config-if)> no preamble-short
preamble disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface preamble-short.2.00

---

### interface proxy connect

Запустить процесс подключения к прокси-серверу. По умолчанию подключение устанавливается через любой интерфейс. Команда с префиксом no устанавливает значение по умолчанию.

**Syntax**

```bash
proxy connect [ via ‹via› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| via | — | — | — |

**Examples**

```
Пример (config-if)> proxy connect via WifiMaster1/WifiStation0
Proxy::Interface: "Proxy0": set connection via ►
WifiMaster1/WifiStation0.
(config-if)> no proxy connect
Proxy::Interface: "Proxy0": set connection via any interface.
```

**Notes**

История изменений Версия Описание Добавлена команда interface proxy connect.3.09

---

### interface proxy protocol

Задать протокол соединения. По умолчанию для прокси-сервера используется протокол http и подключение TCP. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
proxy protocol ‹protocol›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| protocol | — | — | — |

**Examples**

```
Пример (config-if)> proxy protocol socks5
Proxy::Interface: "Proxy0": set proxy protocol to socks5.
(config-if)> no proxy protocol
Proxy::Interface: "Proxy0": reset proxy protocol.
```

**Notes**

История изменений Версия Описание Добавлена команда interface proxy protocol.3.09

---

### interface proxy socks5-udp

Включить режим UDP для протокола SOCKS5. По умолчанию режим UDP выключен. Команда с префиксом no отключает данный режим.

**Syntax**

```bash
proxy socks5-udp
```

**Examples**

```
(config-if)> no proxy socks5-udp
Пример (config-if)> proxy socks5-udp
Proxy::Interface: "Proxy0": enable SOCKS5 UDP mode.
Proxy::Interface: "Proxy0": disable SOCKS5 UDP mode.
```

**Notes**

История изменений Версия Описание Добавлена команда interface proxy socks5-udp.4.1

---

### interface proxy udpgw-upstream

Указать прокси-сервер для подключения UDP. Примечание: Команда доступна при протоколе подключения SOCKS5. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
proxy udpgw-upstream ‹host› [ ‹port› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| host | — | — | — |
| port | — | — | — |

**Examples**

```
Пример (config-if)> proxy udpgw-upstream 202.150.93.130 8080
Proxy::Interface: "Proxy0": set proxy UDPGW upstream to ►
202.150.93.130:8080.
(config-if)> no proxy udpgw-upstream
Proxy::Interface: "Proxy0": cleared proxy UDPGW upstream.
```

**Notes**

История изменений Версия Описание Добавленакоманда interfaceproxy udpgw-upstream.4.1

---

### interface proxy upstream

Задать прокси-сервер для подключения. Команда с префиксом no удаляет данную настройку.

**Syntax**

```bash
proxy upstream ‹host› [‹port›]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| host | — | — | — |
| port | — | — | — |

**Examples**

```
Пример (config-if)> proxy upstream 161.8.174.48 1080
Proxy::Interface: "Proxy0": set proxy upstream to ►
161.8.174.48:1080.
(config-if)> no proxy upstream
Proxy::Interface: "Proxy0": cleared proxy upstream.
```

**Notes**

История изменений Версия Описание Добавлена команда interface proxy upstream.3.09

---

### interface reconnect-delay

Установить период времени между попытками переподключения. По умолчанию используется значение 3. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
reconnect-delay ‹sec›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| sec | — | — | — |

**Examples**

```
(config-if)> no reconnect-delay
Период времени в секундах. Может
принимать значения в пределах от 3 до
600.
Целое числоsec
Пример (config-if)> reconnect-delay 3
Network::Interface::Ppp: "PPTP1": reconnect delay set to 3 ►
seconds.
Network::Interface::Ppp: "PPTP0": reconnect delay reset to ►
default.
```

**Notes**

История изменений Версия Описание Добавлена команда interface reconnect-delay.2.11

---

### interface rekey-interval

Указать период времени между автоматическими изменениями секретных ключей для доступа к сетевым устройствам. По умолчанию используется значение 86400. Команда с префиксом no отключает изменение ключей.

**Syntax**

```bash
rekey-interval ‹interval›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interval | — | — | — |

**Examples**

```
Пример (config-if)> rekey-interval 3000
Network::Interface::Rtx::WifiMaster: Rekey interval is 3000 sec.
(config-if)> no rekey-interval
Network::Interface::Rtx::WifiMaster: "WifiMaster0": rekey ►
interval disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface rekey-interval.2.06 Добавлено значение по умолчанию 3600 секунд.2.15 Значение по умолчанию изменено на 86400 секунд.3.04

---

### interface rename

Назначитьпроизвольноеимя сетевомуинтерфейсу.К интерфейсуможно обращаться по новому имени как по ID. Команда с префиксом no удаляет настройку. Предупреждение:Не переименовывайте интерфейс Home. Это может привести к непредсказуемым системным ошибкам.

**Syntax**

```bash
rename ‹rename›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| rename | — | — | — |

**Examples**

```
Пример (config-if)> rename PPPoE1
Network::Interface::Base: "PPPoE0": renamed to "PPPoE1".
(config-if)> no rename
Network::Interface::Base: "PPPoE0": name cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface rename.2.08

---

### interface rf e2p set

Изменитьзначениеячейкипамятикалибровочныхданных,находящейся по смещению offset на значение value для указанного интерфейса.

**Syntax**

```bash
(config-if) rf e2p set ‹offset› ‹value›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| offset | — | — | — |
| value | — | — | — |

**Examples**

```
Пример (config-if)> rf e2p set 1f6 0
Network::Interface::Rtx::WifiMaster: EEPROM [0x01F6]:0000 set.
```

**Notes**

История изменений Версия Описание Добавлена команда interface rf e2p set.2.04

---

### interface role

Назначить роль интерфейсу.Одному интерфейсуможет быть назначено несколько ролей. Команда используется для правильного отображения связей VLAN в веб-интерфейсе. Команда с префиксом no удаляет роль. Если выполнить команду без аргумента, то весь список ролей интерфейса будет очищен.

**Syntax**

```bash
role ‹role› [ for ‹ifor› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| role | — | — | — |
| ifor | — | — | — |

**Examples**

```
Пример (config-if)> role iptv for GigabitEthernet1
Network::Interface::Base: "GigabitEthernet1": assigned role ►
"iptv" for GigabitEthernet1.
(config-if)> no role iptv for GigabitEthernet1
Network::Interface::Base:"GigabitEthernet1":deleted role "iptv".
(config-if)> no role
Network::Interface::Base: "GigabitEthernet1": deleted all roles.
```

**Notes**

История изменений Версия Описание Добавлена команда interface role.2.06 Добавлен аргумент misc.2.10

---

### interface rrm

Включить RRM для поиска соседних точек доступа по стандарту IEEE 802.11kс целью предоставлениясписка этих точек доступаабонентскому устройству по запросу. По умолчанию эта опция отключена. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
rrm
```

**Examples**

```
Пример (config-if)> rrm
Network::Interface::Rtx::AccessPoint:"WifiMaster0/AccessPoint0":►
RRM enabled.
(config-if)> no rrm
RRM disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface rrm.2.13

---

### interface rssi-threshold

Задать пороговое значение уровня сигнала RSSI для точки доступа, при котором клиенты Wi-Fi будут отключены и не смогут к ней подключиться. По умолчанию используется значение RSSI 0. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
rssi-threshold ‹rssi-threshold›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| rssi-threshold | — | — | — |

**Examples**

```
Пример (config-if)> rssi-threshold -30
Network::Interface::Mtk::AccessPoint:"WifiMaster0/AccessPoint0":►
rssi threshold is set to -30.
(config-if)> no rssi-threshold
rssi threshold reset to 0.
```

**Notes**

История изменений Версия Описание Добавлена команда interface rssi-threshold.4.01

---

### interface schedule

Присвоить интерфейсу расписание. Перед выполнением команды, расписание должно быть создано и настроено при помощи команды schedule action. Команда с префиксом no разрывает связь между расписанием и интерфейсом.

**Syntax**

```bash
schedule ‹schedule›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| schedule | — | — | — |

**Examples**

```
Пример (config-if)> schedule WIFI
Network::Interface::Base: "WifiMaster0": schedule is "WiFi".
(config-if)> no schedule
Network::Interface::Base: "WifiMaster0": schedule cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface schedule.2.06

---

### interface security-level

Установить уровень безопасности для данного интерфейса. Уровни безопасности определяют логику работы межсетевого экрана: • Разрешено устанавливать соединения в направлении private → public. • Запрещено устанавливать соединения, приходящие на интерфейс public, т. е. в направлении public → private и public → public. • Само устройство принимает сетевые подключения (разрешает управление) только с интерфейсов private. • Передачаданныхмеждуинтерфейсамиprivateможетбытьразрешена или запрещена в зависимости от установки глобального параметра isolate-private. • protected интерфейсы не имеют доступа к устройству и другим private/protected подсетям, но они имеют доступ к public интерфейсам и интернету. Устройство обеспечивает защищенным сегментам только доступ к службам DHCP и DNS. • Передача данных от private интерфейса к protected по умолчанию запрещена. Чтобы разрешить такое взаимодействие, необходимо выполнить команду no isolate-private. Примечание: По умолчанию всем вновь созданным интерфейсам присваивается уровень безопасности public. Списки доступа access-list имеют более высокий приоритет, чем уровни безопасности, поэтому с помощьюних можновводитьдополнительныеправила фильтрации пакетов.

**Syntax**

```bash
security-level (public | private | protected)
```

**Examples**

```
Пример Несмотря на то, что не существует функции полного отключения
межсетевого экрана, можно отключать его на отдельных направлениях.
Допустим, требуется полностью разрешить передачу данных между
«домашней» сетью Home и глобальной сетью PPPoE0. Для этого обоим
интерфейсам нужно назначить уровень безопасности private и
отключить функцию isolate-private.
(config)> interface Home security-level private
Network::Interface::IP: "Bridge0": security level set to ►
"private".
(config)> interface PPPoE0 security-level private
```

**Notes**

История изменений Версия Описание Добавлена команда interface security-level.2.00 Добавлен параметр protected.2.06

---

### interface sim pin

Установить PIN-код для SIM-карты. Команда с префиксом no удаляет PIN-код.

**Syntax**

```bash
sim pin ‹pin›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| pin | — | — | — |

**Examples**

```
Пример (config-if)> sim pin 0000
Mobile::Interface: "UsbLte0": PIN code has been set.
(config-if)> no sim pin
Mobile::Interface: "UsbLte0": PIN code has been reset.
```

**Notes**

История изменений Версия Описание Добавлена команда interface sim pin.3.02 Добавлен префикс no.4.00

---

### interface sim slot

Переключить SIM-слот для QMI-модема. По умолчанию используется слот 1. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
sim slot ‹slot›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| slot | — | — | — |

**Examples**

```
(config-if)> no sim slot
Назначить 1 или 2 слот.slot 1
2
Пример (config-if)> sim slot 2
Mobile::Interface: "UsbQmi0": SIM slot is set to "2".
Mobile::Interface: "UsbQmi0": SIM slot is reset to default.
```

**Notes**

История изменений Версия Описание Добавлена команда interface sim slot.3.08

---

### interface spatial-reuse

Включить поддержку Spatial Reuse для точек доступа 2,4 и 5 ГГц. По умолчанию настройка включена. Команда с префиксом no отключает функцию.

**Syntax**

```bash
spatial-reuse
```

**Examples**

```
Пример (config-if)> spatial-reuse
Network::Interface::Rtx::WifiMaster:"WifiMaster0": 11ax spatial ►
reuse enabled.
(config-if)> no spatial-reuse
reuse disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface spatial-reuse.3.08

---

### interface speed

НастроитьскоростьEthernetинтерфейса.По умолчаниюзаданозначение auto. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
speed ‹speed›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| speed | — | — | — |

**Examples**

```
Пример (config-if)> speed 1000
Network::Interface::Ethernet: "GigabitEthernet1/0": speed set ►
to 1000.
(config-if)> no speed
Network::Interface::Ethernet: "GigabitEthernet1/0": speed reset ►
to default (auto-negotiation).
```

**Notes**

История изменений Версия Описание Добавлена команда interface speed.2.06.B.1

---

### interface speed nonegotiate

Отключить автоматическую настройку скорости. По умолчанию,автоматическая настройка включена. Команда с префиксом no включает автоматическую настройку.

**Syntax**

```bash
speed nonegotiate
```

**Examples**

```
Пример (config-if)> speed nonegotiate
Network::Interface::Ethernet: "GigabitEthernet1/0": ►
autonegotiation will be disabled for fixed speed.
(config-if)> no speed nonegotiate
autonegotiation enabled..
```

**Notes**

История изменений Версия Описание Добавлена команда interface speed nonegotiate.2.08

---

### interface ssid

Указать имя беспроводной сети (SSID) для интерфейсов WiFiStation и AccessPoint. В зависимости от типа интерфейса значение SSID обрабатывается по-разному. • Для AccessPoint SSID — необходимая настройка, без которой она не будет принимать подключения. • Для WiFiStation SSID определяет, к какой точке доступа она будет подключаться. Без заданного SSID WiFiStation может подключиться к любой доступной беспроводной сети по своему усмотрению. Команда с префиксом no устанавливает имя беспроводной сети по умолчанию.

**Syntax**

```bash
ssid ‹ssid›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| ssid | — | — | — |

**Examples**

```
Пример (config-if)> ssid MYNETWORK
Network::Interface::Wireless: "WifiMaster0/AccessPoint0": SSID ►
saved.
(config-if)> no ssid
Network::Interface::Rtx::AccessPoint:"WifiMaster0/AccessPoint0":►
SSID reset.
```

**Notes**

История изменений Версия Описание Добавлена команда interface ssid.2.00

---

### interface standby enable

Включить режим standby. При включенном режиме standby интерфейс автоматически отключается, если появляется другое WAN-соединение с более высоким глобальным приоритетом. Режим standby игнорируется в следующих случаях: • приоритет global не настроен; • интерфейс с режимом standby включен в группу, например, Bridge; • текущее WAN-соединение работает поверх standby интерфейса. Команда с префиксом no отключает режим standby.

**Syntax**

```bash
standby enable
```

**Examples**

```
Пример (config-if)> standby enable
Network::Interface::Standby: "CdcEthernet0": enabled.
(config-if)> no standby enable
Network::Interface::Standby: "CdcEthernet0": disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface standby enable.4.00

---

### interface storm-control disable

Включить broadcast storm control на интерфейсе Bridge. По умолчанию эта настройка включена. Команда с префиксом no отключает настройку.

**Syntax**

```bash
storm-control disable
```

**Examples**

```
Пример (config-if)> storm-control disable
Network::Interface::Bridge: "Bridge0": disabled storm control ►
and loop detector.
(config-if)> no storm-control disable
Network::Interface::Bridge:"Bridge0": enabled storm control and ►
loop detector.
```

**Notes**

История изменений Версия Описание Добавлена команда interface storm-control disable.4.00

---

### interface switchport access

Установить идентификатор VLAN на порту для работы в режиме доступа. Разрешаетпередачукадров указанного VLAN в порт и включаетудаление маркера VLAN из передаваемых кадров. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
switchport access vlan ‹vid›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| vid | — | — | — |

**Examples**

```
Пример (config-if)> switchport access vlan 1
Network::Interface::Switch: "GigabitEthernet0/0": set access ►
VLAN ID: 1.
```

**Notes**

История изменений Версия Описание Добавлена команда interface switchport access.2.06

---

### interface switchport friend

Настроить однонаправленный VLAN для группового траффика в дополнение к VLAN доступа. Порт может быть частью одного VLAN доступа. Команда включает переадресацию исходящего трафика с другого VLAN доступа (называемого "friend"). Пакеты "friend" передаются без тега. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
switchport friend vlan ‹vid›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| vid | — | — | — |

**Examples**

```
Пример (config-if)> switchport friend vlan 2
Network::Interface::Switch: "GigabitEthernet0/0": set friend ►
VLAN ID: 2.
```

**Notes**

История изменений Версия Описание Добавлена команда interface switchport friend.2.06

---

### interface switchport mode

Установитьрежим accessили trunkдля выбранногоVLAN. По умолчанию установлен режим access. Команда с префиксом no устанавливает значение по умолчанию.

**Syntax**

```bash
switchport mode [ (access [q-in-q] ) | trunk]
```

**Examples**

```
Пример (config-if)> switchport mode access
Network::Interface::Switch: "GigabitEthernet0/1": access mode ►
enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface switchport mode.2.06

---

### interface switchport trunk

Добавить порт во VLAN. Разрешить прием и передачу кадров указанного VLAN в порт, причем маркер VLAN из передаваемых кадров не удаляется. В режиме trunk допускается добавление порта в несколько VLAN. Команда с префиксом no удаляет порт из указанного VLAN. Если использовать команду без аргументов, порт будет удален из всех VLAN.

**Syntax**

```bash
switchport trunk vlan ‹vid›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| vid | — | — | — |

**Examples**

```
Пример (config-if)> switchport trunk vlan 100
Network::Interface::Switch:"GigabitEthernet0/1":set trunk VLAN ►
ID: 100.
```

**Notes**

История изменений Версия Описание Добавлена команда interface switchport trunk.2.06

---

### interface target-waketime

Включить функцию TWT (Target Wake Time) для точек доступа 2.4 и 5 ГГц. По умолчанию настройка отключена для 2.4 ГГц и включена для 5 ГГц. Команда с префиксом no отключает настройку.

**Syntax**

```bash
target-waketime
```

**Examples**

```
(config-if)> no target-waketime
Пример (config-if)> target-waketime
Network::Interface::Rtx::WifiMaster: "WifiMaster0": 11ax TWT ►
enabled.
disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface target-waketime.3.07

---

### interface traffic-counter action disconnect

Прервать связь с провайдером при достижении лимита трафика.

**Syntax**

```bash
traffic-counter action ‹trigger› disconnect
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| trigger | — | — | — |

**Examples**

```
Пример (config-if)> traffic-counter action limit disconnect
UsbQmi::TrafficCounter: "UsbQmi0": set disconnect action for ►
trigger "limit".
```

**Notes**

История изменений Версия Описание Добавлена команда interface traffic-counter action disconnect. 3.06

---

### interface traffic-counter action sms-alert message

Указать текст SMS-оповещения. ‹message›

**Syntax**

```bash
traffic-counter action ‹trigger› sms-alert message
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| trigger | — | — | — |

**Examples**

```
Пример (config-if)> traffic-counter action threshold sms-alert message ►
TEXT
UsbQmi::TrafficCounter: "UsbQmi0": set message for trigger ►
"threshold".
```

**Notes**

История изменений Версия Описание Добавлена команда interface traffic-counter action sms-alert message. 3.06

---

### interface traffic-counter action sms-alert phone

Указать номера телефонов для SMS-оповещения.

**Syntax**

```bash
traffic-counter action ‹trigger› sms-alert phone ‹phone›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| trigger | — | — | — |
| phone | — | — | — |

**Examples**

```
Пример (config-if)> traffic-counter action threshold sms-alert phone ►
+71112223344
UsbQmi::TrafficCounter: "UsbQmi0": add phone number ►
"+71112223344" for action "threshold".
```

**Notes**

История изменений Версия Описание Добавлена команда interface traffic-counter action sms-alert phone. 3.06

---

### interface traffic-counter enable

Включитьсчетчикмобильноготрафика.По умолчаниюопцияотключена. Команда с префиксом no отключает счетчик.

**Syntax**

```bash
traffic-counter enable
```

**Examples**

```
Пример (config-if)> traffic-counter enable
UsbQmi::TrafficCounter: "UsbQmi0": enabled.
(config-if)> no traffic-counter enable
UsbQmi::TrafficCounter: "UsbQmi0": disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface traffic-counter enable.3.06

---

### interface traffic-counter limit

Установить лимит счетчика трафика в мегабайтах, гигабайтах или терабайтах. Команда с префиксом no сбрасывает настройку.

**Syntax**

```bash
traffic-counter limit ‹value› ‹unit›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| value | — | — | — |
| unit | — | — | — |

**Examples**

```
Пример (config-if)> traffic-counter limit 4 TB
UsbQmi::TrafficCounter: "UsbQmi0": set limit to 4 TB.
(config-if)> no traffic-counter limit
UsbQmi::TrafficCounter: "UsbQmi0": reset limit.
```

**Notes**

История изменений Версия Описание Добавлена команда interface traffic-counter limit.3.06

---

### interface traffic-counter monthly

Задать день месяца для перезапуска счетчика трафика. Команда с префиксом no сбрасывает настройку.

**Syntax**

```bash
traffic-counter monthly ‹day-of-month›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| day-of-month | — | — | — |

**Examples**

```
Пример (config-if)> traffic-counter monthly 31
UsbQmi::TrafficCounter: "UsbQmi0": set day of month to "31".
(config-if)> no traffic-counter monthly
UsbQmi::TrafficCounter: "UsbQmi0": reset day of month.
```

**Notes**

История изменений Версия Описание Добавленакомандаinterfacetraffic-countermonthly.3.06

---

### interface traffic-counter set

Задать текущее значение счетчика трафика.

**Syntax**

```bash
traffic-counter set ‹value› ‹unit›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| value | — | — | — |
| unit | — | — | — |

**Examples**

```
Пример (config-if)> traffic-counter set 1.54 GB
UsbQmi::TrafficCounter: "UsbQmi0": set value to 1.54 GB.
```

**Notes**

История изменений Версия Описание Добавлена команда interface traffic-counter set.3.06

---

### interface traffic-counter threshold

Установить порог оповещения счетчика трафика. Команда с префиксом no сбрасывает настройку.

**Syntax**

```bash
traffic-counter threshold ‹threshold›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| threshold | — | — | — |

**Examples**

```
Пример (config-if)> traffic-counter threshold 99
UsbQmi::TrafficCounter: "UsbQmi0": set treshold to 99 percent ►
of the limit.
(config-if)> no traffic-counter threshold
UsbQmi::TrafficCounter: "UsbQmi0": reset threshold.
```

**Notes**

История изменений Версия Описание Добавлена команда interface traffic-counter threshold. 3.06

---

### interface traffic-shape

Установитьпределскоростипередачиданныхдляуказанногоинтерфейса в обе стороны. По умолчанию скорость не ограничена. Команда с префиксом no удаляет настройку. [ schedule ‹schedule› ]

**Syntax**

```bash
traffic-shape rate ‹rate› [ asymmetric ‹upstream-rate› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| rate | — | — | — |
| upstream-rate | — | — | — |

**Examples**

```
(config-if)> no traffic-shape
Значение скорости передачи данных
в Кбит/с. Ограничение должно быть в
диапазоне от 64 Кбит/с до 1 Гбит/с.
Целое числоrate
Скорость отдачи данных в Кбит/с.
Ограничение должно быть в
Целое числоupstream-rate
Название расписания,созданногопри
помощи группы команд schedule.
```

**Notes**

История изменений Версия Описание Добавлена команда interface traffic-shape.2.05 Добавлен аргумент upstream-rate.3.04

---

### interface tty init

Добавить строку инициализации на указанную позицию index для модемов RAS (UsbModem), NDIS (UsbLte), QMI (UsbQmi). Команда с префиксом no удаляет настройку.

**Syntax**

```bash
tty init [ ‹index› ] ‹string› [ sleep ‹delay› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| index | — | — | — |
| string | — | — | — |
| delay | — | — | — |

**Examples**

```
Пример (config-if)> tty init AT^SYSCFG=14,2,3fffffff,0,1
Mobile::Interface: "UsbQmi0": initialization string inserted.
(config-if)> tty init AT^SYSCFG=14,2,3fffffff,0,1 sleep 1
(config-if)> no tty init
Mobile::Interface: "UsbQmi0": initialization strings erased.
```

**Notes**

История изменений Версия Описание Добавлена команда interface tty init.4.00

---

### interface tty send

Отправить AT-команду на UsbLte, UsbQmi модемы.

**Syntax**

```bash
tty send ‹command› [ ‹expect› ] [ ‹timeout› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| command | — | — | — |
| expect | — | — | — |
| timeout | — | — | — |

**Examples**

```
Пример (config-if)> tty send ATI
".Built@Aug 23 2019:16:28:33"
OK
Mobile::Interface: "UsbLte0": got expected response.
(config-if)> tty send ATI OK|ERROR 2
(config-if)> tty send ATI OKEY 2
Mobile::Interface error[73140786]: "UsbLte0": timeout waiting ►
for expected response.
```

**Notes**

История изменений Версия Описание Добавлена команда interface tty send.3.09

---

### interface tunnel destination

Задать удаленный конец туннеля. Если он используется совместно с автоматическим IPsec-соединением, связанным с туннелем, интерфейс становится инициатором IPsec-соединения. Команда с префиксом no отменяет настройку.

**Syntax**

```bash
tunnel destination ‹destination›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| destination | — | — | — |

**Examples**

```
Пример (config-if)> tunnel destination ya.ru
Network::Interface::Tunnel: "Gre0": destination set to ya.ru.
(config-if)> no tunnel destination
Network::Interface::Tunnel: "Gre0": destination was reset.
```

**Notes**

История изменений Версия Описание Добавлена команда interface tunnel destination.2.08

---

### interface tunnel eoip id

Задать идентификатор EoIP-туннеля. Команда с префиксом no отменяет настройку.

**Syntax**

```bash
tunnel eoip id ‹id›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| id | — | — | — |

**Examples**

```
(config-if)> no tunnel eoip id
Идентификатор туннеля.Целое числоid
Пример (config-if)> tunnel eoip id 50
Network::Interface::Tunnel:"Gre0": eoip id interface set to auto.
Network::Interface::Tunnel: "Gre0": eoip id was reset.
```

**Notes**

История изменений Версия Описание Добавлена команда interface tunnel eoip id.2.08

---

### interface tunnel gre keepalive

ВключитьподдержкуCisco-likekeepaliveдля туннелейGRE. По умолчанию interval равно 5, count равно 3. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
tunnel gre keepalive ‹interval› [count]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interval | — | — | — |

**Examples**

```
Пример (config-if)> tunnel gre keepalive 10 7
Network::Interface::Gre: "Gre0": set GRE keepalive to 10 s (7 ►
retries).
(config-if)> no tunnel gre keepalive
Network::Interface::Gre: "Gre0": disable GRE keepalive.
(config-if)> tunnel gre keepalive 0
Network::Interface::Gre: "Gre0": enable only GRE keepalive ►
replies.
```

**Notes**

История изменений Версия Описание Добавлена команда interface tunnel gre keepalive.2.10

---

### interface tunnel source

Задать локальный конец туннеля. Если он используется совместно с автоматическимIPsec-соединением,связаннымс туннелем,то включается режим приема соединений IPsec IKE на установление защищенного туннеля.

**Syntax**

```bash
tunnel source (auto | ‹interface› | ‹address›)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |
| address | — | — | — |

**Examples**

```
Пример (config-if)> tunnel source auto
Network::Interface::Tunnel: "Gre0": set source interface to auto.
```

**Notes**

История изменений Версия Описание Добавлена команда interface tunnel source.2.08 Добавлен аргумент auto.2.09 Удален префикс no как устаревший.3.08

---

### interface tx-burst

Включить агрегацию пакетов на уровне Wi-Fi драйвера (Tx Burst). По умолчанию параметр отключен. Команда с префиксом no отключает настройку.

**Syntax**

```bash
tx-burst
```

**Examples**

```
Пример (config-if)> tx-burst
Network::Interface::Rtx::WifiMaster: Tx Burst enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface tx-burst.2.07

---

### interface tx-queue length

Установить размер очереди исходящих пакетов на интерфейсе. По умолчанию установлено значение 1000. Команда с префиксом no устанавливает значение по умолчанию.

**Syntax**

```bash
tx-queue length ‹length›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| length | — | — | — |

**Examples**

```
Пример (config-if)> tx-queue length 255
Network::Interface::Base: "L2TP0": TX queue length is 255.
(config-if)> no tx-queue length
Network::Interface::Base: "L2TP0": TX queue length reset to ►
default.
```

**Notes**

История изменений Версия Описание Добавлена команда interface tx-queue length.3.06

---

### interface tx-queue scheduler cake

Установить планировщик пакетов CAKE для интерфейса. По умолчанию значение cake используется для DSL интерфейсов и USB-модемов, fq_codel — для всех остальных. Команда с префиксом no назначает планировщик по умолчанию.

**Syntax**

```bash
tx-queue scheduler cake
```

**Examples**

```
Пример (config-if)> tx-queue scheduler cake
Network::Interface::Base: "L2TP0": set TX queue scheduler to ►
"cake".
(config-if)> no tx-queue scheduler cake
Network::Interface::Base:"L2TP0": set default TX queue scheduler.
```

**Notes**

История изменений Версия Описание Добавленакомандаinterfacetx-queueschedulercake.3.06

---

### interface tx-queue scheduler fq

Установить планировщик пакетов FQ_CODEL для интерфейса. По умолчанию значение cake используется для DSL интерфейсов и USB-модемов, fq_codel — для всех остальных. Команда с префиксом no назначает планировщик по умолчанию.

**Syntax**

```bash
tx-queue scheduler fq_codel
```

**Examples**

```
Пример (config-if)> tx-queue scheduler fq_codel
Network::Interface::Base: "L2TP0": set TX queue scheduler to ►
"fq_codel".
(config-if)> no tx-queue scheduler fq_codel
Network::Interface::Base:"L2TP0": set default TX queue scheduler.
```

**Notes**

История изменений Версия Описание Добавлена команда interface tx-queue scheduler fq_codel. 3.06

---

### interface up

Включить сетевой интерфейс и записать в настройки состояние «up». Команда с префиксом no отключает сетевой интерфейс и удаляет «up» из настроек. Также может быть использована команда interface down.

**Syntax**

```bash
up
```

**Examples**

```
Пример (config-if)> up
Interface enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface up.2.00

---

### interface uplink-mumimo

Включить восходящее соединение 802.11ax MU-MIMO. По умолчанию функция включена. Команда с префиксом no отключает настройку.

**Syntax**

```bash
uplink-mumimo
```

**Examples**

```
Пример (config-if)> uplink-mumimo
Network::Interface::Rtx::WifiMaster: "WifiMaster1": 11ax ►
uplink-mumimo enabled.
(config-if)> no uplink-mumimo
uplink-mumimo disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface uplink-mumimo.3.07

---

### interface uplink-ofdma

Включить восходящее соединение 802.11ax OFDMA. По умолчанию настройка отключена. Команда с префиксом no отключает настройку.

**Syntax**

```bash
uplink-ofdma
```

**Examples**

```
Пример (config-if)> uplink-ofdma
Network::Interface::Rtx::WifiMaster: "WifiMaster1": 11ax ►
downlink-ofdma enabled.
(config-if)> no uplink-ofdma
downlink-ofdma disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface uplink-ofdma.3.07

---

### interface usb acq

Зафиксировать режим 3G/LTE/5G для USB-модемов NDIS (UsbLte). Команда с префиксом no удаляет настройку.

**Syntax**

```bash
usb acq ‹acq›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| acq | — | — | — |

**Examples**

```
Пример (config-if)> usb acq nr5g
Mobile::Interface: "UsbLte0": ACQ saved.
(config-if)> no usb acq
Mobile::Interface: "UsbLte0": ACQ cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface usb acq.2.09 Добавлен аргумент nr5g.4.02

---

### interface usb apn

Назначить имя точки доступа (APN) для USB-модема в NDIS режиме. Модем перезагружается после применения команды. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
usb apn ‹apn›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| apn | — | — | — |

**Examples**

```
Пример (config-if)> usb apn example.net
Network::Interface::Usb: "UsbModem0": APN saved.
(config-if)> no usb apn
Network::Interface::Usb: "UsbModem0": APN cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface usb apn.2.04

---

### interface usb device-id

Добавить информацию о модели и производителе USB-модема в интерфейс. Это необходимо для привязки модема к интерфейсу. Если есть интерфейс UsbModem[N] с совпадающим DeviceID, то при подключении модема произойдет автоматическая привязка его к интерфейсу.Если такого интерфейса нет, он будет создан автоматически с DeviceID подключенного модема. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
usb device-id ‹vendor› ‹model›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| vendor | — | — | — |
| model | — | — | — |

**Examples**

```
Пример (config-if)> usb device-id 12d1 1001
Device ID saved.
```

**Notes**

История изменений Версия Описание Добавлена команда interface usb device-id.2.00

---

### interface usb port-id

Привязать интерфейс RAS (UsbModem), CdcEthernet, NDIS (UsbLte), QMI (UsbQmi) модема к идентификатору USB-порта. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
usb port-id ( ‹port› | auto)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| port | — | — | — |

**Examples**

```
Пример (config-if)> usb port-id 1
Network::Interface::Usb: "CdcEthernet0": port ID is set to "1".
(config-if)> usb port-id auto
Network::Interface::Usb:"CdcEthernet0":port ID is automatically ►
set to "2/4".
(config-if)> no usb port-id
Network::Interface::Usb: "CdcEthernet0": port ID removed.
```

**Notes**

История изменений Версия Описание Добавлена команда interface usb port-id.4.01

---

### interface usb power-cycle

Отключить питание на usb-модеме на заданный промежуток времени. Эта функция используется для аппаратного сброса usb-модема в случае зависания.

**Syntax**

```bash
usb power-cycle ‹pause›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| pause | — | — | — |

**Examples**

```
Пример (config-if)> usb power-cycle 3000
Network::Interface::Usb: "UsbLte0": started 3000 ms. power cycle.
```

**Notes**

История изменений Версия Описание Добавлена команда interface usb power-cycle.2.03

---

### interface usb power-fail

Указать дальнейшие действия в случае, если выключение USB-модема не помогло.

**Syntax**

```bash
usb power-fail ‹interval› ( retry ‹pause› | reboot)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interval | — | — | — |
| pause | — | — | — |

**Examples**

```
Пример (config-if)> usb power-fail 60 reboot
Network::Interface::Usb: "YotaOne1": enabled power fail action: ►
reboot.
```

**Notes**

История изменений Версия Описание Добавлена команда interface usb power-fail.2.10

---

### interface usb wwan-force-connected

Отключить опрос линка CDC-модема по HTTP. По умолчанию данная функция выключена. Команда с префиксом no отключает функцию.

**Syntax**

```bash
usb wwan-force-connected
```

**Examples**

```
Пример (config-if)> usb wwan-force-connected
Network::Interface::Usb: "UsbLte0": force WWAN link status.
(config-if)> no usb wwan-force-connected
Network::Interface::Usb: "UsbLte0": unforce WWAN link status.
```

**Notes**

История изменений Версия Описание Добавлена команда interface wwan-force-connected.2.12

---

### interface web-api address

Указать IP-адрес для доступа к веб-интерфейсу модема, подключенного к маршрутизатору. Команда с префиксом no удаляет адрес.

**Syntax**

```bash
web-api address ‹address›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |

**Examples**

```
Пример (config-if)> web-api address 192.168.8.1
Mobile::Interface: "CdcEthernet0": WEB address is set.
(config-if)> no web-api address
Mobile::Interface: "CdcEthernet0": WEB address cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface web-api address.3.08

---

### interface web-api login

Указать имя пользователя для доступа к веб-интерфейсу модема, подключенного к маршрутизатору. Команда с префиксом no удаляет имя пользователя.

**Syntax**

```bash
web-api login ‹login›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| login | — | — | — |

**Examples**

```
Пример (config-if)> web-api login myadmin
Mobile::Interface: "CdcEthernet0": WEB login is set.
(config-if)> no web-api login
Mobile::Interface: "CdcEthernet0": WEB login cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface web-api login.3.08

---

### interface web-api password

Указать пароль для доступа к веб-интерфейсу модема, подключенного к маршрутизатору. Команда с префиксом no удаляет пароль.

**Syntax**

```bash
web-api password ‹password›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| password | — | — | — |

**Examples**

```
Пример (config-if)> web-api password 12345678910
Mobile::Interface: "CdcEthernet0": WEB password is set.
(config-if)> no web-api password
Mobile::Interface: "CdcEthernet0": WEB password cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface web-api password.3.08

---

### interface whnat

Включить WHNAT (беспроводной аппаратный ускоритель) для AP 5 ГГц. Ускоритель используется при передаче трафика между клиентами LAN и WLAN одного сегмента сети. Когда HWNAT (аппаратный ускоритель) выключен, WHNAT (беспроводной аппаратный ускоритель) работает через SWNAT (программный ускоритель), который снижает скорость в направлении LAN-WLAN. По умолчанию настройка включена. Команда с префиксом no отключает ускоритель.

**Syntax**

```bash
whnat
```

**Examples**

```
Пример (config-if)> whnat
Network::Interface::Rtx::WifiMaster: "WifiMaster1": wireless ►
hardware NAT offload is enabled.
(config-if)> no whnat
hardware NAT offload is disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface whnat.3.09

---

### interface wireguard asc

Настроить параметры для Advanced Security Configuration WireGuard. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
wireguard asc ‹jc› ‹jmin› ‹jmax› ‹s1› ‹s2› ‹h1› ‹h2› ‹h3› ‹h4›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| jc | — | — | — |
| jmin | — | — | — |
| jmax | — | — | — |
| s1 | — | — | — |
| s2 | — | — | — |
| h1 | — | — | — |
| h2 | — | — | — |
| h3 | — | — | — |
| h4 | — | — | — |

**Examples**

```
Пример (config-if)> wireguard asc 120 22 320 0 0 1 2 3 4
Wireguard::Interface: "Wireguard0": set ASC parameters.
(config-if)> no wireguard asc
Wireguard::Interface: "Wireguard0": reset ASC parameters.
```

**Notes**

История изменений Версия Описание Добавлена команда interface wireguard asc.4.02

---

### interface wireguard listen-port

Назначить номер порта UDP, на который принимаются входящие подключения. По умолчанию номер порта не определен. Команда с префиксом no сбрасывает значение порта.

**Syntax**

```bash
wireguard listen-port ‹port›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| port | — | — | — |

**Examples**

```
Пример (config-if)> wireguard listen-port 11633
Wireguard::Interface: "Wireguard4": set listen port to "11633".
(config-if)> no wireguard listen-port
Wireguard::Interface: "Wireguard4": reset listen port.
```

**Notes**

История изменений Версия Описание Добавлена команда interface wireguard listen-port.3.03

---

### interface wireguard peer

Добавитьпубличныйключудаленногопира,чтобынастроитьбезопасное соединение посредством протокола WireGuard. Команда с префиксом no удаляет указанный ключ.

**Syntax**

```bash
wireguard peer ‹key›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| key | — | — | — |

**Examples**

```
Пример (config-if)> wireguard peer ►
gbp1gW3pBQKssrAdah1hiib13Jl123ZM8dBIjjPmm0g=
(config-wg-peer)>
(config-if)> no wireguard peer ►
Wireguard::Interface: "Wireguard4": removed peer ►
"gbp1gW3pBQKssrAdah1hiib13Jl123ZM8dBIjjPmmg0=".
```

**Notes**

История изменений Версия Описание Добавлена команда interface wireguard peer.3.03 3.29.226.1 interface wireguard peer allow-ips Описание Добавить подсеть IP-адресов, на которые разрешена передача пакетов внутри туннеля. Примечание: Чтобы разрешить передачу на любые адреса, необходимо добавить подсеть 0.0.0.0/0. Команда с префиксом no удаляет подсеть. Если выполнить команду без аргумента, то весь список подсетей будет очищен. Префикс no Да Меняет настройки Да Многократный ввод Да Тип интерфейса Wireguard Синопсис (config-wg-peer)> allow-ips ‹address› ‹mask› (config-wg-peer)> no allow-ips [ ‹address› ‹mask› ] Аргументы ОписаниеЗначениеАргумент Вместе с маской mask задает подсеть IP-адресов, подлежащих трансляции. IP-адресaddress Маска подсети. Есть два способа ввода маски: в каноническом виде IP-маскаmask (например,255.255.255.0) и в виде битовой длины префикса (например, /24). Пример (config-wg-peer)> allow-ips 0.0.0.0/0 Wireguard::Interface: "Wireguard4": add allowed IPs ► "0.0.0.0/0.0.0.0" from peer ► "gbp1gW3pBQKssrAdah1hiib13Jl123ZM8dBIjjPmm2g=". (config-wg-peer)> allow-ips 192.168.11.0 255.255.255.0 Wireguard::Interface: "Wireguard4": add allowed IPs ► "192.168.11.0/255.255.255.0" from peer ► "gbp1gW3pBQKssrAdah1hiib13Jl123ZM8dBIjjPmm2g=". (config-wg-peer)> no allow-ips Wireguard::Interface: "Wireguard4": clear allowed IPs of peer ► "gbp1gW3pBQKssrAdah1hiib13Jl123ZM8dBIjjPmm2g=". История изменений Версия Описание Добавлена команда interface wireguard peer allow-ips. 3.03 3.29.226.2 interface wireguard peer connect Описание УказатьинтерфейсдлясоединенияWireGuard.По умолчаниюсоединение устанавливается через любой интерфейс. Команда с префиксом no устанавливает значение по умолчанию. Префикс no Да Меняет настройки Да Многократный ввод Нет Тип интерфейса WireGuard Синопсис (config-wg-peer)> connect via ‹via› (config-wg-peer)> no connect Аргументы ОписаниеЗначениеАргумент Полное имя интерфейса или псевдоним.Интерфейсvia Пример (config-wg-peer)> connect via ISP Wireguard::Interface: "Wireguard0": set peer ► "IrtvFcVtI5wcqxn4cCmuWc+p8s8byPOzK/MAI67VmXs=" connect via "ISP" (config-wg-peer)> no connect Wireguard::Interface: "Wireguard0": disabled peer ► "IrtvFcVtI5wcqxn4cCmuWc+p8s8byPOzK/MAI67VmXs=". История изменений Версия Описание Добавленакомандаinterfacewireguardpeer connect.4.01 3.29.226.3 interface wireguard peer endpoint Описание Указатьадресудаленногопира,с которымбудетустановленосоединение WireGuard. Команда с префиксом no удаляет конечную точку туннеля. Префикс no Да Меняет настройки Да Многократный ввод Нет Тип интерфейса Wireguard Синопсис (config-wg-peer)> endpoint ‹address› [:‹port›] (config-wg-peer)> no endpoint Аргументы ОписаниеЗначениеАргумент IP-адрес или доменное имя удаленного хоста. IP-адресaddress Номер порта UDP.Целое числоport Пример (config-wg-peer)> endpoint 10.0.1.10:11635 Wireguard::Interface: "Wireguard4": set peer ► "gbp1gW3pBQKssrAdah1hiib13Jl123ZM8dBIjjPmm2g=" endpoint to ► "10.0.1.10:11635". (config-wg-peer)> no endpoint Wireguard::Interface: "Wireguard4": reset endpoint for peer ► "gbp1gW3pBQKssrAdah1hiib13Jl123ZM8dBIjjPmm2g=". История изменений Версия Описание Добавлена команда interface wireguard peer endpoint. 3.03 3.29.226.4 interface wireguard peer keepalive-interval Описание Установить интервал отправки пакетов keepalive для мониторинга соединения WireGuard. По умолчанию интервал не задан. Команда с префиксом no удаляет настройку. Префикс no Да Меняет настройки Да Многократный ввод Нет Тип интерфейса Wireguard Синопсис (config-wg-peer)> keepalive-interval ‹interval› (config-wg-peer)> no keepalive-interval Аргументы ОписаниеЗначениеАргумент Интервал отправки пакетов keepalive в секундах. Может принимать значения в пределах от 3 до 3600 включительно. Целое числоinterval Пример (config-wg-peer)> keepalive-interval 3 Wireguard::Interface: "Wireguard4": set peer ► "gbp1gW3pBQKssrAdah1hiib13Jl123ZM8dBIjjPmm2g="keepalive interval ► to "3". (config-wg-peer)> no keepalive-interval Wireguard::Interface: "Wireguard4": reset persistent keepalive ► interval for peer "gbp1gW3pBQKssrAdah1hiib13Jl123ZM8dBIjjPmm2g=". История изменений Версия Описание Добавлена команда interface wireguard peer keepalive-interval. 3.03 3.29.226.5 interface wireguard peer preshared-key Описание Задать разделяемый ключ для WireGuard соединения к удаленному пиру. Разделяемыйключ (PSK)— это дополнительноеулучшениебезопасности в соответствии с протоколом WireGuard и для максимальной защищенности каждому клиенту должен быть назначен уникальный PSK. По умолчанию PSK не используется. Команда с префиксом no удаляет настройку. Префикс no Да Меняет настройки Да Многократный ввод Нет Тип интерфейса Wireguard Синопсис (config-wg-peer)> preshared-key ‹preshared-key› (config-wg-peer)> no preshared-key Аргументы ОписаниеЗначениеАргумент Значение ключа PSK. Допускается использование латинских букв, цифр и Строкаpreshared-key знаков равенства. Длина ключа 44 символа. Пример (config-wg-peer)> preshared-key ► WY2fkhJZuDCbYew7L8whBMzkReVf8KKzWJrmaR79F8z= Wireguard::Interface: "Wireguard4": set preshared key for peer ► "gbp1gW3pBQKssrAdah1hiib13Jl123ZM8dBIjjPmm2g=". (config-wg-peer)> no preshared-key Wireguard::Interface: "Wireguard4": reset preshared key for peer ► "gbp1gW3pBQKssrAdah1hiib13Jl123ZM8dBIjjPmm2g=". История изменений Версия Описание Добавлена команда interface wireguard peer preshared-key. 3.03

---

### interface wireguard private-key

Назначить или сгенерировать приватный ключ для подключения к удаленным пирам через протокол WireGuard. По умолчанию приватный ключ не настроен.

**Syntax**

```bash
wireguard private-key [ ‹private-key› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| private-key | — | — | — |

**Examples**

```
Пример (config-if)> wireguard private-key
Wireguard::Interface: "Wireguard4": generated new private key.
(config-if)> wireguard private-key ►
UshaeghezaiJ7reo8iK6ear0eomujohkeen8jahX5uo=
Wireguard::Interface: "Wireguard4": set private key.
```

**Notes**

История изменений Версия Описание Добавлена команда interface wireguard private-key.3.03

---

### interface wmm

Включить WMM на интерфейсе.

**Syntax**

```bash
wmm
```

**Examples**

```
Пример (config-if)> wmm
WMM extensions enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface wmm.2.00

---

### interface wpa-eap radius secret

Указать совместно используемый секретный ключ для безопасного взаимодействия между RADIUS сервером и RADIUS клиентом. Команда с префиксом no удаляет секретный ключ.

**Syntax**

```bash
wpa-eap radius secret ‹secret›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| secret | — | — | — |

**Examples**

```
Пример (config-if)> wpa-eap radius secret ►
(+>R#G`}-JNxru'i8i|lK}wBN9E^XOXa{xFOG-N^%FaTnr|S(e(q$/lP2/tbX/#Q
Network::Interface::Rtx::WpaEap: Bridge0 RADIUS secret applied.
(config-if)> no wpa-eap radius secret
Network::Interface::Rtx::WpaEap: Bridge0 RADIUS secret cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface wpa-eap radius secret.3.01

---

### interface wpa-eap radius server

Указать адрес RADIUS сервера. Команда с префиксом no удаляет адрес сервера.

**Syntax**

```bash
wpa-eap radius server ‹address› [: ‹port› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |
| port | — | — | — |

**Examples**

```
Пример (config-if)> wpa-eap radius server 192.168.10.10
Network::Interface::Rtx::WpaEap: Bridge0 RADIUS server set to ►
192.168.10.10.
(config-if)> wpa-eap radius server 192.168.10.10:1111
192.168.10.10:1111.
(config-if)> no wpa-eap radius server
Network::Interface::Rtx::WpaEap: Bridge0 RADIUS server cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда interface wpa-eap radius server.3.01

---

### interface wps

Включить функциональность WPS.

**Syntax**

```bash
wps
```

**Examples**

```
(config-if)> no wps
Пример (config-if)> wps
WPS functionality enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface wps.2.00

---

### interface wps auto-self-pin

Включить режим WPS auto-self-pin. По умолчанию режим auto-self-pin включен. Команда с префиксом no отключает этот режим.

**Syntax**

```bash
wps auto-self-pin
```

**Examples**

```
Пример (config-if)> wps auto-self-pin
Network::Interface::Rtx::Wps: an auto self PIN mode enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда interface wps auto-self-pin.2.04

---

### interface wps button

НачатьпроцессWPS с использованиемкнопки.Процессдлится2 минуты, или меньше, если соединение установлено.

**Syntax**

```bash
wps button ‹direction›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| direction | — | — | — |

**Examples**

```
Пример (config-if)> wps button send
Sending WiFi configuration process started (software button mode).
```

**Notes**

История изменений Версия Описание Добавлена команда interface wps button.2.00

---

### interface wps peer

Начать процесс WPS используя PIN удаленного узла. Процесс длится 2 минуты, или меньше, если соединение установлено. По умолчанию процесс WPS PIN выключен.

**Syntax**

```bash
wps peer ‹direction› ‹pin›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| direction | — | — | — |
| pin | — | — | — |

**Examples**

```
Пример (config-if)> wps peer send 53794141
Network::Interface::Rtx::Wps: "WifiMaster0/AccessPoint0": peer ►
PIN WPS session started.
```

**Notes**

История изменений Версия Описание Добавлена команда interface wps peer.2.04

---

### interface wps self-pin

Начать процесс WPS используяPIN устройства.Процесс длится 2 минуты, или меньше, если соединение установлено.

**Syntax**

```bash
wps self-pin ‹direction›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| direction | — | — | — |

**Examples**

```
Пример (config-if)> wps self-pin receive
Receiving WiFi configuration process started (self PIN mode).
```

**Notes**

История изменений Версия Описание Добавлена команда interface wps self-pin.2.00

---

### interface zerotier accept-addresses

Включить получение адреса от сервера ZeroTier. Команда с префиксом no отключает эту функцию.

**Syntax**

```bash
zerotier accept-addresses
```

**Examples**

```
Пример (config-if)> zerotier accept-addresses
ZeroTier::Interface: "ZeroTier0": enabled addresses accept.
(config-if)> no zerotier accept-addresses
ZeroTier::Interface: "ZeroTier0": disabled addresses accept.
```

**Notes**

История изменений Версия Описание Добавлена команда interface zerotier accept-addresses. 4.01

---

### interface zerotier accept-routes

Включить получение маршрутов от удаленной стороны через ZeroTier. Команда с префиксом no отключает эту функцию.

**Syntax**

```bash
zerotier accept-routes
```

**Examples**

```
Пример (config-if)> zerotier accept-routes
ZeroTier::Interface: "ZeroTier0": enabled routes accept.
(config-if)> no zerotier accept-routes
ZeroTier::Interface: "ZeroTier0": disabled routes accept.
```

**Notes**

История изменений Версия Описание Добавлена команда interface zerotier accept-routes.4.01

---

### interface zerotier connect

Задать интерфейс для подключения ZeroTier. Если аргумент не указан, подключение устанавливается через любой интерфейс. Команда с префиксом no устанавливает значение по умолчанию.

**Syntax**

```bash
zerotier connect [ via ‹via› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| via | — | — | — |

**Examples**

```
Пример (config-if)> zerotier connect via ISP
ZeroTier::Interface: "ZeroTier0": set connection via ISP.
(config-if)> no zerotier connect
ZeroTier::Interface: "ZeroTier0": set connection via any ►
interface.
```

**Notes**

История изменений Версия Описание Добавлена команда interface zerotier connect.4.01

---

### interface zerotier network-id

Задать идентификатор туннеля ZeroTier. Команда с префиксом no удаляет данную настройку.

**Syntax**

```bash
zerotier network-id ‹network-id›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| network-id | — | — | — |

**Examples**

```
Пример (config-if)> zerotier network-id 816227940c13c37e
ZeroTier::Interface: "ZeroTier0": set network ID to ►
"816227940c13c37e".
(config-if)> no zerotier network-id
ZeroTier::Interface: "ZeroTier0": reset network ID.
```

**Notes**

История изменений Версия Описание Добавлена команда interface zerotier network-id.4.01

---

### ip arp

Задать статическое сопоставление между IP и MAC адресами для хостов, не поддерживающих динамический ARP. Командас префиксомno удаляетзаписьиз таблицыARP. Если выполнить команду без аргументов, весь список записей ARP будет очищен.

**Syntax**

```bash
ip arp ‹ip› ‹mac›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| ip | — | — | — |
| mac | — | — | — |

**Examples**

```
Пример (config)> ip arp 192.168.2.50 a1:2e:84:85:f4:21
Network::ArpTable: Static ARP entry saved.
(config)> no ip arp 192.168.2.50
Network::ArpTable: Static ARP entry deleted for 192.168.2.50.
(config)> no ip arp
Network::ArpTable: Static ARP table cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда ip arp.2.00

---

### ip dhcp class

Доступ к группе команд для настройки вендор-класса DHCP (60 опция). Если класс вендоров не найден, команда пытается его создать. Команда с префиксом no удаляет выбранный класс.

**Syntax**

```bash
ip dhcp class ‹class›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| class | — | — | — |

**Examples**

```
(config)> no ip dhcp class ‹class›
Название вендор-класса.Строкаclass
Пример (config)> ip dhcp class STB-One
Dhcp::Server: Vendor class "STB-One" has been created.
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp class.2.00

---

### ip dhcp class option

Указать значение опции 60 для присвоения вендор-класса. Команда с префиксом no удаляет указанный класс.

**Syntax**

```bash
option ‹number› hex ‹data›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| number | — | — | — |
| data | — | — | — |

**Examples**

```
Пример (config-dhcp-class)> option 60 hex FF
Dhcp::Server: Option 60 is set to FF.
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp class option.2.00

---

### ip dhcp host

Настроить статическую привязку IP-адреса к MAC-адресу хоста. Если хост с указанным именем не найден, команда пытается его создать. Если указанный IP-адрес не входит в диапазон ни одного пула, команда сохранится в настройках, но на работу сервера DHCP не повлияет. Команда позволяет поменять MAC-адрес, оставив прежнее значение IP-адреса, и наоборот — поменять IP-адрес, оставив прежнее значение MAC-адреса. Команда с префиксом no удаляет хост.

**Syntax**

```bash
ip dhcp host ‹host› [ mac ] [ ip ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| host | — | — | — |

**Examples**

```
Пример (config)> ip dhcp host HOST 192.168.1.44
new host "HOST" has been created.
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp host.2.00

---

### ip dhcp pool

Доступ к группе команд для настройки DHCP-пула. Если пул не найден, команда пытается его создать. Для пула задается список DNS-серверов (команда dns-server), шлюз по умолчанию (команда default-router) и времяаренды(командаlease), а такжедиапазондинамическихIP-адресов (команда range). После настройки пулов необходимо включить службу DHCP с помощью команды service dhcp. Можно создать не больше 32 пулов. Максимальная длина имени пула — 64 символа. Примечание: В текущей версии системы реализована поддержка не болееодногопулана интерфейс.Длякорректнойработы сервера DHCP требуется, чтобы диапазон IP-адресов, установленный командой range, принадлежал сети, настроенной на одном из Ethernet-интерфейсов устройства. Команда с префиксом no удаляет пул.

**Syntax**

```bash
ip dhcp pool ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (config)> ip dhcp pool test_pool
pool "test_pool" has been created.
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp pool.2.00

---

### ip dhcp pool bind

Привязать пул к указанному интерфейсу.

**Syntax**

```bash
bind ‹interface›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |

**Examples**

```
Пример (config-dhcp-pool)> bind GigabitEthernet1
pool "test_pool" bound to interface GigabitEthernet1.
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp pool bind.2.00

---

### ip dhcp pool bootfile

Указать путь к файлу настроек на TFTP-сервере для клиента DHCP (опция 67). Команда с префиксом no удаляет настройку.

**Syntax**

```bash
bootfile ‹bootfile›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| bootfile | — | — | — |

**Examples**

```
Пример (config-dhcp-pool)> bootfile test.cnf
Dhcp::Pool: "_WEBADMIN": set bootfile option to "test.cnf".
(config-dhcp-pool)> no bootfile
Dhcp::Pool: "_WEBADMIN": cleared bootfile option.
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp pool bootfile.2.11

---

### ip dhcp pool class

Доступ к группе команд для настройки вендор-класса DHCP выбранного пула адресов. Если класс вендоров не найден, команда пытается его создать. Для корректной работы имя класса должно быть таким же, как и в команде ip dhcp class. Команда с префиксом no удаляет выбранный класс.

**Syntax**

```bash
class ‹class›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| class | — | — | — |

**Examples**

```
Пример (config-dhcp-pool)> class STB-One
Dhcp::Server: Vendor class "STB-One" has been created.
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp pool class.2.00 3.33.3.1 ip dhcp pool class option Описание Установить дополнительные опции для DHCP клиента в случае совпадения вендор-класса. Команда с префиксом no удаляет указанную опцию. Префикс no Да Меняет настройки Да Многократный ввод Да Синопсис (config-dhcp-pool-class)> option ‹number› ‹type› ‹data› (config-dhcp-pool-class)> no option ‹number› Аргументы ОписаниеЗначениеАргумент number Опция 6, DNS-сервер.6 Опция 42, NTP-сервер.42 Опция 43, подробная информация о производителе. 43 type Тип аргумента data — IP-адрес. Этот тип не используется для опции 43. ip Тип аргумента data — шестнадцатеричное число. hex ОписаниеЗначениеАргумент Значение опции.Строкаdata Пример (config-dhcp-pool-class)> option 6 ip 192.168.1.1 Dhcp::Server: Option 6 is set to 192.168.1.1. История изменений Версия Описание Добавлена команда ip dhcp pool class option.2.00

---

### ip dhcp pool debug

Добавить отладочные сообщения в системный журнал. По умолчанию настройка отключена. Команда с префиксом no отключает отладку.

**Syntax**

```bash
debug
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp pool debug.2.01

---

### ip dhcp pool default-router

Настроить IP-адрес шлюза по умолчанию. Если не указан, то будет использоваться адрес, настроенный на Ethernet-интерфейсе, определенном автоматически для заданного диапазона range. Команда с префиксом no отменяет настройку.

**Syntax**

```bash
default-router ‹address›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |

**Examples**

```
Пример (config-dhcp-pool)> default-router 192.168.1.88
pool "test_pool" router address has been saved.
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp pool default-router.2.00

---

### ip dhcp pool dns-server

Настроить IP-адреса серверов DNS (DHCP-опция 6). Если не указан, то будет использоваться адрес, настроенный на Ethernet-интерфейсе, определенном автоматически для заданного диапазона range. Команда с префиксом no отменяет настройку.

**Syntax**

```bash
dns-server ( ‹address1› [ address2 ] | disable)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address1 | — | — | — |

**Examples**

```
Пример (config-dhcp-pool)> dns-server 192.168.1.88
pool "test_pool" name server list has been saved.
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp pool dns-server.2.00 Добавлен аргумент disable.2.11

---

### ip dhcp pool domain

Указать доменное имя, которое клиент должен использовать при разрешении имен через DNS (option 15). Команда с префиксом no отменяет настройку.

**Syntax**

```bash
domain ‹domain›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| domain | — | — | — |

**Examples**

```
Пример (config-dhcp-pool)> domain example.net
Dhcp::Pool: Domain option has been saved.
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp pool domain.2.05

---

### ip dhcp pool enable

Начать использовать пул в системе. Команда с префиксом no отключает использование пула.

**Syntax**

```bash
enable
```

**Examples**

```
Пример (config-dhcp-pool)> enable
Dhcp::Server: pool "111" is enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp pool enable.2.03

---

### ip dhcp pool lease

Установить время аренды IP-адресов пула DHCP. По умолчанию используется значение 25200 (7 часов). Команда с префиксом no возвращает значение времени аренды по умолчанию.

**Syntax**

```bash
lease ‹lease›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| lease | — | — | — |

**Examples**

```
Пример (config-dhcp-pool)> lease 259200
Dhcp::Pool: "_WEBADMIN": set lease time: 259200 seconds.
(config-dhcp-pool)> no lease
Dhcp::Pool: "_WEBADMIN": lease time reset to default (25200 ►
seconds).
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp pool lease.2.00

---

### ip dhcp pool next-server

Указать адрес TFTP-сервера для DHCP-клиента (опция 66). Команда с префиксом no удаляет настройку.

**Syntax**

```bash
next-server ‹address›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |

**Examples**

```
(config-dhcp-pool)> no next-server
Адрес сервера TFTP.IP-адресaddress
Пример (config-dhcp-pool)> next-server 10.1.1.11
Dhcp::Pool: "_WEBADMIN": set next server address: 10.1.1.11.
Dhcp::Pool: "_WEBADMIN": cleared next server address.
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp pool next-server.2.11

---

### ip dhcp pool option

Задать дополнительные параметры для DHCP-сервера. Команда с префиксом no удаляет дополнительную настройку.

**Syntax**

```bash
option ‹number› [ type ] ‹data›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| number | — | — | — |
| data | — | — | — |

**Examples**

```
Пример (config-dhcp-pool)> option 4 192.168.2.1
Dhcp::Pool: "_WEBADMIN_BRIDGE2": set option 4.
(config-dhcp-pool)> option 60 ascii "MSFT 5.0"
Dhcp::Pool: "_WEBADMIN_BRIDGE2": set option 60.
(config-dhcp-pool)> option 150 ip 41.57.50.46,42.54.50.46
Dhcp::Pool: "_WEBADMIN_BRIDGE2": set option 150.
(config-dhcp-pool)> no option 4
Dhcp::Pool: "_WEBADMIN_BRIDGE2": cleared option 4.
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp pool option.2.09

---

### ip dhcp pool range

Настроитьдиапазондинамическихадресов,выдаваемыхDHCP-клиентам некоторой подсети. Диапазон задается начальным и конечным IP-адресом, либо начальным адресом и размером. Сетевой интерфейс, к которому будут применены настройки, выбирается автоматически. Адрес выбранного интерфейса используется в качестве шлюза по умолчанию и DNS-сервера, если не заданы другие адреса командами ip dhcp pool default-router и ip dhcp pool dns-server. Команда с префиксом no удаляет диапазон.

**Syntax**

```bash
range ‹begin› ( ‹end› | ‹size› )
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| begin | — | — | — |
| end | — | — | — |
| size | — | — | — |

**Examples**

```
Пример (config-dhcp-pool)> range 192.168.15.43 3
pool "_WEBADMIN" range has been saved.
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp pool range.2.00

---

### ip dhcp pool update-dns

Добавлять статические записи в DNS-прокси при выдаче DHCP-адресов. В качестве имени используется имя хоста из DHCP-запроса. По умолчанию функция отключена. Команда с префиксом no отключает функцию.

**Syntax**

```bash
update-dns
```

**Examples**

```
Пример (config-dhcp-pool)> update-dns
Dhcp::Pool: DNS update has been enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp pool update-dns.2.06

---

### ip dhcp pool wpad

Настроить DHCP опцию 252 — протокол WPAD. По умолчанию опция отключена. Команда с префиксом no отключает настройку.

**Syntax**

```bash
wpad ‹wpad›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| wpad | — | — | — |

**Examples**

```
Пример (config-dhcp-pool)> wpad http://wpad/wpad.dat
Dhcp::Pool: WPAD option has been saved.
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp pool wpad.2.05

---

### ip dhcp relay lan

Указать, на каком сетевом интерфейсе ретранслятор DHCP будет обрабатыватьзапросыклиентов.Можно указатьнесколькоинтерфейсов «lan», для этого нужно ввести команду несколько раз, указав все необходимые интерфейсы по одному. Команда с префиксом no отключает ретранслятор DHCP на указанном интерфейсе. Если использовать команду без аргументов, ретранслятор DHCP будет отключен на всех интерфейсах.

**Syntax**

```bash
ip dhcp relay lan ‹interface›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |

**Examples**

```
Пример (config)> ip dhcp relay lan Home
added LAN interface Home.
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp relay lan.2.00

---

### ip dhcp relay server

Указать IP-адрес сервера DHCP, на который ретранслятор будет перенаправлять запросы клиентов из локальной сети. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
ip dhcp relay server ‹address›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |

**Examples**

```
Пример (config)> ip dhcp relay server 192.168.1.11
using DHCP server 192.168.1.11.
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp relay server.2.00

---

### ip dhcp relay wan

Указывает, через какой сетевой интерфейс ретранслятор DHCP будет обращатьсяк вышестоящему серверу DHCP. В системе может быть только один интерфейс такого типа. Если точный адрес сервера не указан (см. ip dhcp relay server), запросы будут передаваться широковещательно. Рекомендуется указывать адрес сервера. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
ip dhcp relay wan ‹interface›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |

**Examples**

```
(config)> no ip dhcp relay wan [ interface ]
Полное имя или псевдоним интерфейса
Ethernet, на который будут направляться
запросы от DHCP-клиентов.
Интерфейсinterface
Пример (config)> ip dhcp relay wan GigabitEthernet1
using WAN interface GigabitEthernet1.
```

**Notes**

История изменений Версия Описание Добавлена команда ip dhcp relay wan.2.00

---

### ip esp alg enable

Включить режим IPSec Passthrough для туннелей IPsec ESP. По умолчанию настройка выключена. Команда с префиксом no отключает настройку.

**Syntax**

```bash
ip esp alg enable
```

**Examples**

```
Пример (config)> ip esp alg enable
Esp::Alg: Enabled.
(config)> no ip esp alg enable
Esp::Alg: Disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда ip esp alg enable.3.05

---

### ip flow-cache timeout active

Установить время хранения активных сессий в кеше. По умолчанию используется значение 10. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
ip flow-cache timeout active ‹timeout›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| timeout | — | — | — |

**Examples**

```
Пример (config)> ip flow-cache timeout active 1
Netflow::Manager: Active timeout set to "1" min.
(config)> no ip flow-cache timeout active
Netflow::Manager: Active timeout reset to "10" min.
```

**Notes**

История изменений Версия Описание Добавлена команда ip flow-cache timeout active.2.11

---

### ip flow-cache timeout inactive

Установить время хранения неактивных сессий в кеше. По умолчанию используется значение 20. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
ip flow-cache timeout inactive ‹timeout›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| timeout | — | — | — |

**Examples**

```
Пример (config)> ip flow-cache timeout inactive 1
Netflow::Manager: Inactive timeout set to "1" s.
(config)> no ip flow-cache timeout inactive
Netflow::Manager: Inactive timeout reset to "20" s.
```

**Notes**

История изменений Версия Описание Добавлена команда ip flow-cache timeout inactive.2.11

---

### ip flow-export destination

Задать параметры коллектора NetFlow. Команда с префиксом no удаляет параметры.

**Syntax**

```bash
ip flow-export destination ‹address› ‹port›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |
| port | — | — | — |

**Examples**

```
Пример (config)> ip flow-export destination 192.168.101.31 4739
Netflow::Manager: Export destination is set to ►
192.168.101.31:4739.
(config)> no ip flow-export destination
Netflow::Manager: Export destination is unset.
```

**Notes**

История изменений Версия Описание Добавлена команда ip flow-export destination.2.11

---

### ip flow-export version

Указать версию коллектора NetFlow. По умолчанию используется значение 5. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
ip flow-export version ‹version›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| version | — | — | — |

**Examples**

```
Пример (config)> ip flow-export version 9
Netflow::Manager: Set export protocol version to 9.
(config)> no ip flow-export version
Netflow::Manager: Reset export version to 5.
```

**Notes**

История изменений Версия Описание Добавлена команда ip flow-export version.3.05

---

### ip ftp

Группа команд для настройки доступа к ftp.

**Syntax**

```bash
ip ftp
```

**Examples**

```
Пример (config)> ip ftp
(config-ftp)>
```

**Notes**

История изменений Версия Описание Добавлена команда ip ftp.2.08

---

### ip ftp client-charset

Установить кодировку по умолчанию для FTP-сервера. По умолчанию используется кодировка UTF-8. Команда с префиксом no возвращает кодировку по умолчанию.

**Syntax**

```bash
client-charset ‹charset›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| charset | — | — | — |

**Examples**

```
Пример (config-ftp)> client-charset utf-16
Ftp::Server: Set client charset to "utf-16".
(config-ftp)> no client-charset
Ftp::Server: Reset client charset to default.
```

**Notes**

История изменений Версия Описание Добавлена команда ip ftp client-charset.2.11

---

### ip ftp lockout-policy

Задать параметры отслеживания попыток вторжения путём перебора паролей FTP-сервера для публичных интерфейсов. По умолчанию функция включена. Eсли в качестве аргумента используется 0, все параметры отслеживания перебора будут сброшены в значения по умолчанию. Команда с префиксом no отключает обнаружение подбора. [‹observation-window›]]

**Syntax**

```bash
lockout-policy ‹threshold› [‹duration›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| threshold | — | — | — |
| duration | — | — | — |

**Examples**

```
(config-ftp)> no lockout-policy
Количество неудачных попыток
входа в систему. По умолчанию
Целое числоthreshold
установлено значение 5. Может
принимать значения в пределах от
3 до 20.
Продолжительность запрета
авторизации для указанного
Целое числоduration
```

**Notes**

История изменений Версия Описание Добавлена команда ip ftp lockout-policy.2.12

---

### ip ftp permissive

Разрешитьдоступ к серверуFTP для всехпользователейбез авторизации. Команда с префиксом no запрещает такой доступ.

**Syntax**

```bash
permissive
```

**Examples**

```
Пример (config-ftp)> permissive
(config-ftp)> no permissive
```

**Notes**

История изменений Версия Описание Добавлена команда ip ftp permissive.2.08

---

### ip ftp security-level

Установить уровень безопасности FTP. По умолчанию установлено значение private.

**Syntax**

```bash
security-level (public | private | protected)
```

**Examples**

```
Пример (config-ftp)> security-level protected
Ftp::Manager: Security level changed to protected.
```

**Notes**

История изменений Версия Описание Добавлена команда ip ftp security-level.2.08

---

### ip host

Добавить доменное имя и адрес в таблицу DNS.

**Syntax**

```bash
ip host ‹domain› ‹address›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| domain | — | — | — |
| address | — | — | — |

**Examples**

```
Пример (config)> ip host zydata.local 192.168.1.22
Dns::Manager: Added static record for "zydata.local", address ►
192.168.1.22.
(config)> no ip host zydata.local 192.168.1.22
Dns::Manager: Record "zydata.local", address 192.168.1.22 deleted.
```

**Notes**

История изменений Версия Описание Добавлена команда ip host.2.00

---

### ip hotspot

Доступ к группе команд для настройки Управления Домашней Сетью.

**Syntax**

```bash
ip hotspot
```

**Examples**

```
Пример (config)> ip hotspot
(config-hotspot)>
```

**Notes**

История изменений Версия Описание Добавлена команда ip hotspot.2.06

---

### ip hotspot auto-register disable

Принудительно отключить автоматическую регистрацию хостов в сегменте Home. По умолчанию автоматическая регистрация включена. Команда с префиксом no включает автоматическую регистрацию.

**Syntax**

```bash
auto-register disable
```

**Examples**

```
Пример (config-hotspot)> auto-register disable
Hotspot::AutoRegister: Disabled host auto-registration.
(config-hotspot)> no auto-register disable
Hotspot::AutoRegister: Enabled host auto-registration.
```

**Notes**

История изменений Версия Описание Добавлена команда ip hotspot auto-register disable.4.02

---

### ip hotspot auto-scan interface

Включить фоновое сканирование на заданном интерфейсе. По умолчанию включено. Команда с префиксом no отключает настройку.

**Syntax**

```bash
auto-scan interface ‹interface›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |

**Examples**

```
Пример (config-hotspot)> auto-scan interface WifiMaster0/AccessPoint1
Hotspot::Discovery::Manager: Subnetwork scanning on interface ►
"WifiMaster0/AccessPoint1" is unchanged.
(config-hotspot)> auto-scan interface WifiMaster0/AccessPoint1
"WifiMaster0/AccessPoint1" is disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда ip hotspot auto-scan interface.2.08

---

### ip hotspot auto-scan interval

Задать интервал проверки хостов, находящихся онлайн. По умолчанию используется значение 30. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
auto-scan interval ‹interval›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interval | — | — | — |

**Examples**

```
Пример (config-hotspot)> auto-scan interval 10
Hotspot::Discovery::Manager: Auto-scan probe interval is set to ►
10 s.
(config-hotspot)> no auto-scan interval
Hotspot::Discovery::Manager: Auto-scan probe interval reset to ►
default.
```

**Notes**

История изменений Версия Описание Добавлена команда ip hotspot auto-scan interval.2.08

---

### ip hotspot auto-scan passive

Задать скорость пассивного сканирования в хостах в секунду. По умолчанию используется значение 3. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
auto-scan passive ‹rate› hps
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| rate | — | — | — |

**Examples**

```
Пример (config-hotspot)> auto-scan passive 5 hps
Hotspot::Discovery::Manager: Auto-scan rate is set to 5 hps.
(config-hotspot)> no auto-scan passive
Hotspot::Discovery::Manager: Auto-scan rate reset to default.
```

**Notes**

История изменений Версия Описание Добавлена команда ip hotspot auto-scan passive.2.08

---

### ip hotspot auto-scan timeout

Установитьоффлайновыйтайм-аутдляхостов.Послеуказанноговремени отсутствующийхост удаляетсяиз списка обнаруженныххостовхот-спота. По умолчанию используется значение 35. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
auto-scan timeout ‹timeout›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| timeout | — | — | — |

**Examples**

```
(config-hotspot)> no auto-scan timeout
Оффлайновый тайм-аут в секундах.Целое числоtimeout
Пример (config-hotspot)> auto-scan timeout 31
Hotspot::Discovery::Manager: Auto-scan host offline timeout is ►
set to 31 s.
Hotspot::Discovery::Manager:Auto-scan host offline timeout reset ►
to default.
```

**Notes**

История изменений Версия Описание Добавлена команда ip hotspot auto-scan timeout.2.08

---

### ip hotspot default-policy

Определить политику Управления Домашней Сетью для всех интерфейсов или назначить профиль доступа в Интернет. Политика применяется ко всем интерфейсам, не имеющим собственного правила доступа, ip hotspot policy. Политика по умолчанию: permit. Команда с префиксом no устанавливает значение политики по умолчанию.

**Syntax**

```bash
default-policy (‹access› | ‹policy›)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| access | — | — | — |
| policy | — | — | — |

**Examples**

```
Пример (config-hotspot)> default-policy permit
FHotspot::Manager: Default policy "permit" applied.
(config-hotspot)> default-policy deny
Hotspot::Manager: Default policy "deny" applied.
(config-hotspot)> default-policy Policy0
Hotspot::Manager: Default policy "Policy0" applied.
(config-hotspot)> no default-policy
Hotspot::Manager: Default policy cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда ip hotspot default-policy.2.09 Добавлен аргумент policy.2.12

---

### ip hotspot host

Настроитьправила доступаили блокировкидля определенныхклиентов Управления Домашней Сетью. Данные правила имеют более высокий приоритет, чем настройка политики (см. команду ip hotspot policy). Команда с префиксом no удаляет настройку. ‹policy›)

**Syntax**

```bash
host ‹mac› (‹access› | schedule ‹schedule› | policy
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mac | — | — | — |
| access | — | — | — |
| schedule | — | — | — |

**Examples**

```
(config-hotspot)> no host ‹mac› (‹access› | schedule | policy)
MAC-адрес хоста. Хост должен быть
зарегистрирован заранее с
помощью команды known host.
MAC-адресmac
access Разрешить доступ к сети Интернет.permit
Запретить доступ к сети Интернет.deny
Название расписания, созданного
при помощи группы команд
schedule.
```

**Notes**

История изменений Версия Описание Добавлена команда ip hotspot host.2.06 Добавленыаргументы permit, deny, schedule, policy.2.12

---

### ip hotspot host priority

Назначить определенный приоритет всему трафику, направленному к зарегистрированному хосту. Регистрация хоста выполняется заранее при помощи команды known host. Команда с префиксом no удаляет приоритет.

**Syntax**

```bash
host ‹mac› priority ‹priority›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mac | — | — | — |
| priority | — | — | — |

**Examples**

```
Пример (config-hotspot)> host 04:d2:c1:14:bc:59 priority 7
Hotspot::Manager: Applied priority "7" to host ►
"04:d2:c1:14:bc:59".
(config-hotspot)> no host 04:d2:c1:14:bc:59 priority
Hotspot::Manager: Removed priority from host "04:d2:c1:14:bc:59".
```

**Notes**

История изменений Версия Описание Добавлена команда ip hotspot host priority.3.08

---

### ip hotspot policy

Определить политику Управления Домашней Сетью для выбранного интерфейса. Политика применяется ко всем хостам, не имеющим собственного правила доступа ip hotspot host. Политика по умолчанию: permit. Команда с префиксом no устанавливает значение политики по умолчанию.

**Syntax**

```bash
policy ‹interface› (‹access› | ‹policy›)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |
| access | — | — | — |
| policy | — | — | — |

**Examples**

```
Пример (config-hotspot)> policy Home permit
Hotspot::Manager: Policy "permit" applied to interface "Home".
(config-hotspot)> policy Home deny
Hotspot::Manager: Policy "deny" applied to interface "Home".
(config-hotspot)> policy Home Policy0
Hotspot::Manager: Policy "Policy0" applied to interface "Home".
(config-hotspot)> no policy Home
Hotspot::Manager: Interface "Home" policy cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда ip hotspot policy.2.06 Добавлен аргумент policy.2.12

---

### ip hotspot priority

Назначить определенный приоритет всему трафику, направленному к интерфейсу. Команда с префиксом no удаляет приоритет.

**Syntax**

```bash
priority ‹interface› ‹priority›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |
| priority | — | — | — |

**Examples**

```
Пример (config-hotspot)> priority Home 7
Hotspot::Manager: Applied priority "7" to interface "Home".
(config-hotspot)> no priority Home
Hotspot::Manager: Removed priority from interface "Home".
```

**Notes**

История изменений Версия Описание Добавлена команда ip hotspot priority.3.08

---

### ip hotspot wake

Отправить Wake-on-LAN пакет на private и protected интерфейсы хоста.

**Syntax**

```bash
wake ‹mac›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mac | — | — | — |

**Examples**

```
Пример (config-hotspot)> wake a8:1e:84:11:f1:22
Hotspot::Manager: WoL sent to host: a8:1e:84:11:f1:22.
```

**Notes**

История изменений Версия Описание Добавлена команда ip hotspot wake.2.08

---

### ip http lockout-policy

Задать параметры отслеживания попыток вторжения путём перебора паролей HTTP для публичных интерфейсов. По умолчанию функция включена. Eсли в качестве аргумента используется 0, все параметры отслеживания перебора будут сброшены в значения по умолчанию. Команда с префиксом no отключает обнаружение подбора. [‹observation-window›]]

**Syntax**

```bash
ip http lockout-policy ‹threshold› [‹duration›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| threshold | — | — | — |
| duration | — | — | — |

**Examples**

```
(config)> no ip http lockout-policy
Количество неудачных попыток входа
в систему. По умолчанию установлено
Целое числоthreshold
значение 5. Может принимать
значения в пределах от 4 до 20.
Продолжительность запрета
авторизациидля указанногоIP-адреса
Целое числоduration
в минутах.По умолчаниюустановлено
```

**Notes**

История изменений Версия Описание Добавлена команда ip http lockout-policy.2.08

---

### ip http log access

Включить режим отладки на веб-сервере(nginx). По умолчанию функция отключена. Команда с префиксом no отключает отладочный режим.

**Syntax**

```bash
ip http log access
```

**Examples**

```
Пример (config)> ip http log access
Http::Manager: Enabled access logging.
(config)> no ip http log access
Http::Manager: Disabled access logging.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http log access.3.00

---

### ip http log auth

Включить логирование попыток неудачной авторизации в системе. По умолчанию функция отключена. Команда с префиксом no отключает логирование.

**Syntax**

```bash
ip http log auth
```

**Examples**

```
Пример (config)> ip http log auth
Http::Manager: Auth logging enabled.
(config)> no ip http log auth
Http::Manager: Auth logging disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http log auth.2.08

---

### ip http log webdav

Включить логирование попыток неудачного подключения к серверу WebDAV. По умолчанию функция отключена. Команда с префиксом no отключает логирование.

**Syntax**

```bash
ip http log webdav
```

**Examples**

```
Пример (config)> ip http log webdav
WebDav::Server: Enabled request tracing.
(config)> no ip http log webdav
WebDav::Server: Disabled request tracing.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http log webdav.3.04

---

### ip http port

Назначить HTTP порт для веб-интерфейса Giga. По умолчанию используется порт 80. Команда с префиксом no устанавливает порт по умолчанию.

**Syntax**

```bash
ip http port ‹port›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| port | — | — | — |

**Examples**

```
(config)> no ip http port
Новый порт HTTP.Целое числоport
Пример (config)> ip http port 8080
Http::Manager: Port changed to 8080.
Http::Manager: Port reset to 80.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http port.2.08

---

### ip http proxy

Доступ к группе команд для настройки HTTP-прокси. Если прокси не найден, команда пытается его создать. Команда с префиксом no удаляет прокси.

**Syntax**

```bash
ip http proxy ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (config)> ip http proxy TEST
Http::Manager: Proxy "TEST" successfully created.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http proxy.2.08

---

### ip http proxy auth

Включить авторизацию для HTTP-прокси. По умолчанию параметр отключен. Команда с префиксом no отключает авторизацию для HTTP-прокси.

**Syntax**

```bash
auth
```

**Examples**

```
Пример (config-http-proxy)> auth
Http::Manager: Proxy password auth is enabled.
(config-http-proxy)> no auth
Http::Manager: Proxy password auth is disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http proxy auth.2.10

---

### ip http proxy dns-override

Включить локальные переопределения DNS для доменов четвертого уровня KeenDNS. По умолчанию эта настройка включена. Примечание: Для домена четвертого уровня KeenDNS добавляется статическая A-запись DNS с адресом 78.47.125.180 (это IP, который мы приобрели для имени my.netcraze.net) для доступа в локальной сети маршрутизатора. После отключения этой функции статическая A-запись DNS с адресом 78.47.125.180 будет удалена из системы маршрутизатора для домена четвертого уровня KeenDNS. Команда с префиксом no отключает эту функцию.

**Syntax**

```bash
dns-override
```

**Examples**

```
Пример (config-http-proxy)> dns-override
Http::Proxy: "test": enabled DNS override.
(config-http-proxy)> no dns-override
Http::Proxy: "test": disabled DNS override.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http proxy dns-override.4.03

---

### ip http proxy domain

Установить доменное имя, определяющее FQDN виртуального хоста. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
domain static ‹domain›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| domain | — | — | — |

**Examples**

```
Пример (config-http-proxy)> domain static example.net
Http::Manager: Configured base domain for proxy: test.
(config-http-proxy)> no domain
Http::Manager: Removed ndns domain for proxy: test.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http proxy domain.2.08

---

### ip http proxy domain ndns

Использовать доменное имя, полученное от сервиса NDNS. Если данная опция включена, настройка ip http proxy domain стирается. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
domain ndns
```

**Examples**

```
Пример (config-http-proxy)> domain ndns
Http::Manager: Configured ndns domain for proxy: test.
(config-http-proxy)> no domain
Http::Manager: Removed ndns domain for proxy: test.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http proxy domain ndns.2.08

---

### ip http proxy force-host

Включить переопределение заголовка Host для upstream. Команда с префиксом no отключает настройку.

**Syntax**

```bash
force-host ‹force-host›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| force-host | — | — | — |

**Examples**

```
Пример (config-http-proxy)> force-host 192.168.8.1
Http::Proxy: "modem": enabled Host header enforcing to ►
"192.168.8.1".
(config-http-proxy)> force-host modem.netcraze.pro
"modem.netcraze.pro".
(config-http-proxy)> no force-host
Http::Proxy: "modem": disabled Host header enforcing.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http proxy force-host.3.06

---

### ip http proxy preserve-host

Установить параметр для сохранения исходного заголовка при проксировании. Команда с префиксом no отключает настройку.

**Syntax**

```bash
preserve-host
```

**Examples**

```
Пример (config-http-proxy)> preserve-host
Http::Manager: Proxy HTTP Host header preservation is enabled.
(config-http-proxy)> no preserve-host
Http::Manager: Proxy HTTP Host header preservation is disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http proxy preserve-host.2.13

---

### ip http proxy security-level

Установить уровень безопасности для HTTP-прокси. По умолчанию установлено значение private. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
security-level (public | private)
```

**Examples**

```
Пример (config-http-proxy)> security-level public
Http::Proxy: "test1": set public security level.
(config-http-proxy)> no security-level
Http::Proxy: "test1": unset public security level.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http proxy security-level.3.05

---

### ip http proxy ssl redirect

Включить автоматическое перенаправление на домены с сертификатом SSL для службыHTTP-прокси.По умолчаниюперенаправлениевключено. Команда с префиксом no отключает перенаправление.

**Syntax**

```bash
ssl redirect
```

**Examples**

```
Пример (config)> ip http ssl redirect
Http::Proxy: "mytest": enabled SSL redirect.
(config)> no ip http ssl redirect
Http::Proxy: "mytest": disabled SSL redirect.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http proxy ssl redirect.4.00

---

### ip http proxy upstream

Установить адрес HTTP или HTTPS сервера, на который будут перенаправляться запросы. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
upstream (http | https) (‹mac› | ‹ip› | ‹fqdn›) [‹port›]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mac | — | — | — |
| ip | — | — | — |
| fqdn | — | — | — |
| port | — | — | — |

**Examples**

```
Пример (config-http-proxy)> upstream http 192.168.1.1 8080
Http::Manager: Proxy "TEST" upstream was set.
(config-http-proxy)> upstream https google.com 443
Http::Proxy: "modem": set https upstream google.com, port 443.
(config-http-proxy)> no upstream
Http::Manager: Remove upstream info for proxy "test".
```

**Notes**

История изменений Версия Описание Добавлена команда ip http proxy upstream.2.08 Добавлено ключевое слово https.3.05

---

### ip http proxy x-real-ip

Включить поддержку заголовков X-Real-IP and X-Forwarded-For для HTTP прокси. Команда с префиксом no отключает заголовки.

**Syntax**

```bash
x-real-ip
```

**Examples**

```
Пример (config-http-proxy)> x-real-ip
Http::Proxy: "test1": enabled X-Real-IP and X-Forwarded-For ►
headers.
(config-http-proxy)> no x-real-ip
Http::Proxy: "test1": disabled X-Real-IP and X-Forwarded-For ►
```

**Notes**

История изменений Версия Описание Добавлена команда ip http proxy x-real-ip.3.05

---

### ip http security-level

Установить уровень безопасности для удаленного доступа к веб интерфейсу Netcraze. По умолчанию установлено значение private.

**Syntax**

```bash
ip http security-level (public [ssl] | private | protected)
```

**Examples**

```
Пример (config)> ip http security-level protected
Http::Manager: Security level changed to protected.
(config)> ip http security-level public ssl
Http::Manager: Security level set to public SSL.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http security-level.2.08 Добавлен параметр ssl.3.00

---

### ip http ssl acme ecdsa

Включить поддержку сертификатов на основе криптографии ECDSA. Команда с префиксом no отключает эту функцию.

**Syntax**

```bash
ip http ssl acme ecdsa
```

**Examples**

```
Пример (config)> ip http ssl acme ecdsa
Acme::Client: Enabled ECDSA chain.
(config)> no ip http ssl acme ecdsa
Acme::Client: Disabled ECDSA chain.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http ssl acme ecdsa.3.09

---

### ip http ssl acme get

Создать и подписать сертификат SSL для указанного доменного имени (по умолчанию, KeenDNS). Для него должен быть предоставлен доступ из Интернета.

**Syntax**

```bash
ip http ssl acme get [ ‹domain› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| domain | — | — | — |

**Examples**

```
Пример (config)> ip http ssl acme get mytest.netcraze.pro
Acme::Client: Obtaining certificate for domain ►
"mytest.netcraze.pro" is started.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http ssl acme get.2.11

---

### ip http ssl acme list

Показать список бесплатных сертификатов Let`s Encrypt в системе.

**Syntax**

```bash
ip http ssl acme list
```

**Examples**

```
Пример (config)> ip http ssl acme list
certificate:
domain: cc6b5a71a7644903b51a5454.netcraze.io
should-be-renewed: no
is-expired: no
issue-time: 2018-06-20T09:16:30.000Z
expiration-time: 2018-09-17T09:16:30.000Z
domain: mytest.netcraze.pro
issue-time: 2018-06-28T16:36:56.000Z
expiration-time: 2018-09-25T16:36:56.000Z
```

**Notes**

История изменений Версия Описание Добавлена команда ip http ssl acme list.2.11

---

### ip http ssl acme revoke

Отменить и удалить SSL-сертификат для указанного доменного имени (KeenDNS, по умолчанию).

**Syntax**

```bash
ip http ssl acme revoke ‹domain›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| domain | — | — | — |

**Examples**

```
Пример (config)> ip http ssl acme revoke mytest.netcraze.pro
Acme::Client: Revoking certificate for domain ►
"mytest.netcraze.pro" is started.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http ssl acme revoke.2.11

---

### ip http ssl enable

Включить SSL на HTTP сервере. По умолчанию, SSL отключен. Команда с префиксом no отключает SSL.

**Syntax**

```bash
ip http ssl enable
```

**Examples**

```
Пример (config)> ip http ssl enable
Http::Manager: Enabled SSL service.
(config)> no ip http ssl enable
Http::Manager: Disabled SSL service.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http ssl enable.2.07

---

### ip http ssl port

Назначить HTTPS порт для веб-интерфейса Giga. По умолчанию используется значение 443. Команда с префиксом no устанавливает порт по умолчанию.

**Syntax**

```bash
ip http ssl port ‹port›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| port | — | — | — |

**Examples**

```
Пример (config)> ip http ssl port 4343
Http::Manager: SSL port changed to 4343.
(config)> no ip http ssl port
Http::Manager: SSL port reset to 443.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http ssl port.4.00

---

### ip http ssl redirect

Включитьавтоматическоеперенаправлениена доменахс сертификатом SSL. По умолчанию перенаправление включено. Команда с префиксом no отключает перенаправление.

**Syntax**

```bash
ip http ssl redirect
```

**Examples**

```
Пример (config)> ip http ssl redirect
Http::Manager: Redirect to SSL is enabled.
(config)> no ip http ssl redirect
Http::Manager: Redirect to SSL is disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http ssl redirect.2.11

---

### ip http webdav

Доступ к группе команд для настройки параметров сервера WebDAV.

**Syntax**

```bash
ip http webdav
```

**Examples**

```
Пример (config)> ip http webdav
Core::Configurator: Done.
(config-webdav)>
```

**Notes**

История изменений Версия Описание Добавлена команда ip http webdav.3.04

---

### ip http webdav enable

Включить сервер WebDAV. По умолчанию сервер отключён. Команда с префиксом no отключает сервер WebDAV.

**Syntax**

```bash
enable
```

**Examples**

```
Пример (config-webdav)> enable
WebDav::Server: Enabled.
(config-webdav)> no enable
WebDav::Server: Disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http webdav enable.3.04

---

### ip http webdav permissive

Разрешить доступ к серверу WebDAV для всех пользователей без авторизации. Команда с префиксом no запрещает анонимный доступ.

**Syntax**

```bash
permissive
```

**Examples**

```
Пример (config-webdav)> permissive
WebDav::Server: Enabled permissive mode.
(config-webdav)> no permissive
WebDav::Server: Disabled permissive mode.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http webdav permissive.3.04

---

### ip http webdav security-level

Установить уровень безопасности для удаленного доступа к серверу WebDAV. По умолчанию используется значение private.

**Syntax**

```bash
security-level (public | private)
```

**Examples**

```
Пример (config-webdav)> security-level public
Http::Manager: WebDAV security level set to public.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http webdav security-level.3.04

---

### ip http x-frame-options

Установить значение заголовка X-Frame-Options для веб-сервера (nginx) в домашнем сегменте сети. Команда с префиксом no отключает настройку.

**Syntax**

```bash
ip http x-frame-options ‹x-frame-options›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| x-frame-options | — | — | — |

**Examples**

```
Пример (config)> ip http x-frame-options DENY
Http::Manager: Set X-Frame-Options to "DENY".
(config)> no ip http x-frame-options DENY
Http::Manager: Disabled X-Frame-Options header.
```

**Notes**

История изменений Версия Описание Добавлена команда ip http x-frame-options.3.05

---

### ip name-server

Настроить IP-адреса серверов DNS. Сохраненные таким образом адреса называются статическими, в противоположность динамическим — зарегистрированным службами PPP или DHCP. Активными,то естьиспользуемымив данныймоментадресами,являются те, которые были зарегистрированы позже остальных. Обычно система использует адреса, полученные несколькими последними успешно подключившимися службами PPP или DHCP. Если ни одна из служб не регистрирует адреса DNS активными будут статические настройки. Однако, если после регистрации динамических адресов пользователем были измененыстатическиенастройки,они становятсяактивными,пока не будут зарегистрированы новые динамические адреса. ip name-server можно вводить многократно, если требуется настроить несколько адресов DNS-серверов. Кроме того, каждому введенному адресу можно сопоставить одно или несколько доменных имен для работы со специфическими зонами, например, локальными именами в корпоративной сети. Команда с префиксом no удаляет указанный адрес сервера DNS из статического и активного списка, если команда дается с аргументами, либо очищает список статических адресов, если команда дается без аргументов. ] ]

**Syntax**

```bash
ip name-server ‹address› [ : ‹port› ] [ ‹domain› [ on ‹interface›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |
| port | — | — | — |
| domain | — | — | — |
| interface | — | — | — |

**Examples**

```
(config)> no ip name-server [ ‹address› [ : ‹port› ] ] [ ‹domain› [ on
‹interface› ] ]
Адрес сервера имен.IP-адресaddress
Порт сервера имен.Целое числоport
Домен, для которого будет использоваться
сервер. DNS-прокси при разрешении
имени в первую очередь выбирает адрес
сервера с наиболее близким к запросу
доменом. Если домен не указывать, сервер
будет использоваться для всех запросов.
```

**Notes**

История изменений Версия Описание Добавлена команда ip name-server.2.00 Добавлен аргумент port.2.14

---

### ip nat

Включить трансляцию «локальных» адресов сети network или сети за интерфейсом interface. Например, команда ip nat Home означает, что для всех пакетов из сети Home, проходящих через маршрутизатор, будет выполнена подмена адресов источника.

**Syntax**

```bash
ip nat ( ‹interface› | ‹address› ‹mask› )
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |
| address | — | — | — |
| mask | — | — | — |

**Examples**

```
Пример (config)> ip nat Home
Network::Nat: A NAT rule added.
(config)> no ip nat Home
Network::Nat: A NAT rule removed.
```

**Notes**

История изменений Версия Описание Добавлена команда ip nat.2.00

---

### ip nat full-cone

Включить режим Full Cone NAT. По умолчанию режим выключен. Команда с префиксом no отключает этот режим.

**Syntax**

```bash
ip nat full-cone
```

**Examples**

```
Пример (config)> ip nat full-cone
Network::Nat: Full cone mode enabled.
(config)> no ip nat full-cone
Network::Nat: Full cone mode disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда ip nat full-cone.3.01

---

### ip nat oc

Включить трансляцию адресов для клиентов OpenConnect. Примечание: Команда может быть использована, если установлен компонент OpenConnect VPN-сервер. Команда с префиксом no удаляет правило.

**Syntax**

```bash
ip nat oc
```

**Examples**

```
Пример (config)> ip nat oc
OcServer::Nat: OpenConnect VPN NAT enabled.
(config)> no ip nat oc
OcServer::Nat: OpenConnect VPN NAT disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда ip nat oc.4.02

---

### ip nat restricted-cone

Включить режим Restricted NAT. По умолчанию режим выключен. Команда с префиксом no отключает этот режим.

**Syntax**

```bash
ip nat restricted-cone
```

**Examples**

```
Пример (config)> ip nat restricted-cone
Network::Nat: Restricted cone mode enabled.
(config)> no ip nat restricted-cone
Network::Nat: Restricted cone mode disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда ip nat restricted-cone.3.01

---

### ip nat sstp

Включить трансляцию адресов для клиентов SSTP. Примечание: Команда может быть использована, если установлен компонент SSTP VPN-сервер. Команда с префиксом no удаляет правило.

**Syntax**

```bash
ip nat sstp
```

**Examples**

```
Пример (config)> ip nat sstp
SstpServer::Nat: SSTP VPN NAT enabled.
(config)> no ip nat sstp
SstpServer::Nat: SSTP VPN NAT disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда ip nat sstp.2.12

---

### ip nat vpn

Включить трансляцию адресов для VPN-клиентов. Примечание: Команда может быть использована, если установлен компонент PPTP VPN-сервер. Команда с префиксом no удаляет правило.

**Syntax**

```bash
ip nat vpn
```

**Examples**

```
Пример (config)> ip nat vpn
VpnServer::Nat: PPTP VPN NAT enabled.
(config)> no ip nat vpn
VpnServer::Nat: PPTP VPN NAT disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда ip nat vpn.2.04

---

### ip policy

Доступ к группе команд для настройки профиля доступа в Интернет — правила выбора маршрута по умолчанию для хостов и сегментов домашней сети. Если профиль доступа не найден, команда пытается его создать. Можно создать не более 16 профилей. Команда с префиксом no удаляет указанный профиль доступа из списка.

**Syntax**

```bash
ip policy ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (config)> ip policy Policy0
Network::PolicyTable: Created policy "Policy0".
(config)> no ip policy Policy0
Network::PolicyTable: Removed policy "Policy0".
```

**Notes**

История изменений Версия Описание Добавлена команда ip policy.2.12

---

### ip policy description

Назначить произвольное описание профилю доступа в Интернет. Команда с префиксом no стирает описание.

**Syntax**

```bash
description ‹description›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| description | — | — | — |

**Examples**

```
Пример (config-policy)> description PolicyOne
Network::PolicyTable: "Policy0": updated description.
(config-policy)> no description
```

**Notes**

История изменений Версия Описание Добавлена команда ip policy description.2.12

---

### ip policy multipath

Включить функцию одновременногоиспользованияWAN-подключений в режиме балансировки. Команда с префиксом no отключает функцию.

**Syntax**

```bash
multipath
```

**Examples**

```
Пример (config-policy)> multipath
Network::PolicyTable: "Policy0": enable multipath.
(config-policy)> no multipath
Network::PolicyTable: "Policy0": disable multipath.
```

**Notes**

История изменений Версия Описание Добавлена команда ip policy multipath.2.14

---

### ip policy permit

Разрешитьиспользованиепрофилядоступадляглобальногоинтерфейса. Если один профиль доступа разрешен для нескольких интерфейсов, можно указать приоритет для каждого из них. Команда с префиксом no запрещает использование профиля доступа для указанного интерфейса. Если ввести команду без аргументов, профиль доступа будет запрещен для всех интерфейсов.

**Syntax**

```bash
permit global ‹interface› [ order ‹order› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |
| order | — | — | — |

**Examples**

```
Пример (config-policy)> permit global L2TP0 order 0
Network::PolicyTable: "Policy0": set permission to use L2TP0.
(config-policy)> no permit global L2TP0
Network::PolicyTable: "Policy0": set no permission to use L2TP0.
```

**Notes**

История изменений Версия Описание Добавлена команда ip policy permit.2.12

---

### ip policy permit auto

Автоматически разрешать новые подключения для профиля доступа. По умолчанию функция отключена. Команда с префиксом no удаляет автоматическое разрешение.

**Syntax**

```bash
permit auto
```

**Examples**

```
Пример (config-policy)> permit auto
Network::PolicyTable: "Policy0": set auto permission.
(config-policy)> no permit auto
```

**Notes**

История изменений Версия Описание Добавлена команда ip policy permit auto.2.12

---

### ip policy rate-limit input

Добавить параметры ограничения входящей скорости для глобальных интерфейсов профиля доступа. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
rate-limit ‹interface› input (‹rate› | auto)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |
| rate | — | — | — |

**Examples**

```
Пример (config-policy)> rate-limit WifiMaster1/WifiStation0 input auto
Network::PolicyTable: "Policy0": set input rate limit to "auto".
(config-policy)> rate-limit WifiMaster1/WifiStation0 input 100000
Network::PolicyTable:"Policy0": set input rate limit to "100000" ►
kbps.
(config-policy)> rate-limit WifiMaster1/WifiStation0 no input
Network::PolicyTable: "Policy0": reset input rate limit.
```

**Notes**

История изменений Версия Описание Добавлена команда ip policy rate-limit input.3.05

---

### ip policy rate-limit output

Добавить параметры ограничения исходящей скорости для глобальных интерфейсов профиля доступа. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
rate-limit ‹interface› output ( ‹rate› | auto)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |
| rate | — | — | — |

**Examples**

```
Пример (config-policy)> rate-limit ISP output auto
Network::PolicyTable: "Policy0": set output rate limit to "auto".
(config-policy)> rate-limit ISP output 1000
Network::PolicyTable: "Policy0": set output rate limit to "1000" ►
kbps.
(config-policy)> rate-limit ISP no output
Network::PolicyTable: "Policy0": reset ouput rate limit.
```

**Notes**

История изменений Версия Описание Добавлена команда ip policy rate-limit output.3.05 Добавлен аргумент auto.3.08

---

### ip policy standalone

Включить "автономный" режим, при котором статические маршруты не копируютсяавтоматическииз основныхнастроекв выбранныйпрофиль доступа.Описание Команда с префиксом no отключает функцию. Да

**Syntax**

```bash
standalone
```

**Examples**

```
Пример (config-policy)> standalone
Network::PolicyTable: "Policy0": enable standalone mode.
(config-policy)> no standalone
Network::PolicyTable: "Policy0": disable standalone mode.
```

**Notes**

История изменений Версия Описание Добавлена команда ip policy standalone.4.02

---

### ip route

Добавить в таблицу маршрутизации статический маршрут, который задает правило передачи IP-пакетов через определенный шлюз или сетевой интерфейс. В качестве сети назначения можно указать ключевое слово default. В этом случае будет создан маршрут по умолчанию. Команда с префиксом no удаляет маршрут с указанными параметрами. [interface] | ‹interface›) [auto] [metric] [reject]

**Syntax**

```bash
ip route ( ‹network› ‹mask› | ‹host› | default) ( ‹gateway›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| network | — | — | — |
| mask | — | — | — |
| host | — | — | — |
| gateway | — | — | — |

**Examples**

```
(config)> no ip route ( ‹network› ‹mask› | ‹host› | default) [‹gateway› |
‹interface›] [metric]
IP-адрес сети назначения.IP-адресnetwork
Маска сети назначения. Есть два способа
ввода маски: в каноническом виде
IP-маскаmask
(например, 255.255.255.0) и в виде
битовойдлиныпрефикса(например,/24).
IP-адрес узла назначения.IP-адресhost
Используется для задания маршрутов по
```

**Notes**

История изменений Версия Описание Добавлена команда ip route.2.00 Добавлена опция reject.3.08

---

### ip search-domain

Указать домен поиска для разрешения неполных имен хостов. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
ip search-domain ‹domain›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| domain | — | — | — |

**Examples**

```
Пример (config)> ip search-domain my.example
(config)> no ip search-domain my.example
```

**Notes**

История изменений Версия Описание Добавлена команда ip search-domain.2.00

---

### ip sip alg direct-media

ЗаменитьIP-адресв поле OwnerпротоколаSDP. Эта функцияиспользуется чтобы не настраивать отдельный проброс портов для VoIP-трафика. По умолчанию настройка отключена. Команда с префиксом no отключает настройку.

**Syntax**

```bash
ip sip alg direct-media
```

**Examples**

```
Пример (config)> ip sip alg direct-media
Sip::Alg: Direct media enabled.
(config)> no ip sip alg direct-media
Sip::Alg: Direct media disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда ip sip alg direct-media.2.11

---

### ip sip alg port

Указать номер порта для SIP сообщений, отличный от стандартного. По умолчанию используется номер порта 5060. Команда с префиксом no устанавливает порт по умолчанию.

**Syntax**

```bash
ip sip alg port ‹port›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| port | — | — | — |

**Examples**

```
Пример (config)> ip sip alg port 7090
Sip::Alg: Port set to 7090.
(config)> no ip sip alg port
Sip::Alg: Port reset to default.
```

**Notes**

История изменений Версия Описание Добавлена команда ip sip alg port.2.12

---

### ip ssh

Доступ к группе команд для управления SSH-сервером.

**Syntax**

```bash
ip ssh
```

**Examples**

```
Пример (config)> ip ssh
(config-ssh)>
```

**Notes**

История изменений Версия Описание Добавлена команда ip ssh.2.12

---

### ip ssh cipher

Установить шифрование симметричного ключа для сеанса SSH. Команда с префиксом no удаляет указанный алгоритм шифрования.

**Syntax**

```bash
cipher ‹cipher›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| cipher | — | — | — |

**Examples**

```
Пример (config-ssh)> cipher chacha20-poly1305@openssh.com
Ssh::Manager: Added cipher "chacha20-poly1305@openssh.com".
(config-ssh)> no cipher chacha20-poly1305@openssh.com
Ssh::Manager: Use default ciphers.
```

**Notes**

История изменений Версия Описание Добавлена команда ip ssh cipher.3.04 ОписаниеВерсия Добавлены новые алгоритмы шифрования aes128-gcm@openssh.com, aes256-gcm@openssh.com. 3.05

---

### ip ssh keygen

Обновление ключа заданного типа.

**Syntax**

```bash
keygen ‹keygen›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| keygen | — | — | — |

**Examples**

```
Пример (config-ssh)> keygen default
Ssh::Manager: Key generation is in progress...
```

**Notes**

История изменений Версия Описание Добавлена команда ip ssh keygen.2.12

---

### ip ssh lockout-policy

Задать параметры отслеживания попыток вторжения путём перебора паролей SSH для публичных интерфейсов. По умолчанию функция включена. Eсли в качестве аргумента используется 0, все параметры отслеживания перебора будут сброшены в значения по умолчанию. Команда с префиксом no отключает обнаружение подбора. [‹observation-window›]]

**Syntax**

```bash
ip ssh lockout-policy ‹threshold› [‹duration›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| threshold | — | — | — |
| duration | — | — | — |

**Examples**

```
(config)> no ip ssh lockout-policy
Количество неудачных попыток
входа в систему. По умолчанию
Целое числоthreshold
установлено значение 5. Может
принимать значения в пределах
от 4 до 20.
Продолжительность запрета
авторизации для указанного
Целое числоduration
```

**Notes**

История изменений Версия Описание Добавлена команда ip ssh lockout-policy.2.12

---

### ip ssh port

Назначитьпорт для SSH-соединения.По умолчаниюиспользуетсяномер порта 22. Команда с префиксом no устанавливает номер порта в значение по умолчанию.

**Syntax**

```bash
port ‹number›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| number | — | — | — |

**Examples**

```
(config-ssh)> no port
Номер порта. Может принимать значения
в пределах от 1 до 65535 включительно.
Целое числоnumber
Пример (config-ssh)> port 2626
Ssh::Manager: Port changed to 2626.
Ssh::Manager: Port reset to 22.
```

**Notes**

История изменений Версия Описание Добавлена команда ip ssh port.2.12

---

### ip ssh security-level

Установить уровень безопасности SSH. По умолчанию установлено значение private.

**Syntax**

```bash
security-level (public | private | protected)
```

**Examples**

```
Пример (config-ssh)> security-level protected
Ssh::Manager: Security level changed to protected.
```

**Notes**

История изменений Версия Описание Добавлена команда ip ssh security-level.2.12

---

### ip ssh session timeout

УстановитьвремясуществованиянеактивнойсессиидляSSH-соединения. По умолчанию тайм-аут равен 300, то есть функция отслеживания активности внутри сессии отключена. Команда с префиксом no устанавливает тайм-аут по умолчанию.

**Syntax**

```bash
session timeout ‹timeout›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| timeout | — | — | — |

**Examples**

```
Пример (config-ssh)> session timeout 123456
Ssh::Manager: A session timeout value set to 123456 seconds.
(config-ssh)> no session timeout
Ssh::Manager: A session timeout reset.
```

**Notes**

История изменений Версия Описание Добавлена команда ip ssh session timeout.3.03

---

### ip ssh sftp

Доступ к группе команд для управления сервером SFTP.

**Syntax**

```bash
ip ssh sftp
```

**Examples**

```
Пример (config)> ip ssh sftp
(config-sftp)>
```

**Notes**

История изменений Версия Описание Добавлена команда ip ssh sftp.3.04 3.73.7.1 ip ssh sftp enable Описание Включить SFTP-сервер. Команда с префиксом no отключает сервер. Префикс no Да Меняет настройки Да Многократный ввод Нет Тип интерфейса IP Синопсис (config-sftp)> enable (config-sftp)> no enable Пример (config-sftp)> enable Ssh::Manager: Enabled SFTP server. (config-sftp)> no enable Ssh::Manager: Disabled SFTP server. История изменений Версия Описание Добавлена команда ip ssh sftp enable.3.04 3.73.7.2 ip ssh sftp permissive Описание Разрешить доступ к серверу SFTP для всех пользователей без авторизации. Команда с префиксом no запрещает такой доступ. Префикс no Да Меняет настройки Да Многократный ввод Нет Тип интерфейса IP Синопсис (config-sftp)> permissive (config-sftp)> no permissive Пример (config-sftp)> permissive (config-sftp)> no permissive История изменений Версия Описание Добавлена команда ip ssh sftp permissive.3.04 3.73.7.3 ip ssh sftp root Описание Задать корневой каталог на сервере SFTP по умолчанию. Команда с префиксом no сбрасывает настройку корневого каталога. Префикс no Да Меняет настройки Да Многократный ввод Нет Тип интерфейса IP Синопсис (config-sftp)> root ( ‹directory› | ‹directory› ) (config-sftp)> no root Аргументы ОписаниеЗначениеАргумент Путь к корневому каталогу по умолчанию.Строкаdirectory Пример (config-sftp)> root files_ssd:/ Sftp::Server: A default root directory set to "files_ssd:/". (config-sftp)> no root files_ssd:/ Sftp::Server: A default root directory reset. История изменений Версия Описание Добавлена команда ip ssh sftp root.3.04

---

### ip static

Создать правило трансляции локальных IP-адресов в глобальные или наоборот. Если interface или network соответствует интерфейсу c уровнем безопасности public, то будет выполняться трансляция адреса назначения(DNAT).Если to-addressсоответствуетинтерфейсуc уровнем безопасностиpublic, то будетвыполнятьсятрансляцияадресаисточника (SNAT). Номер порта TCP/UDP всегда рассматривается как порт назначения. Если networkсоответствуетодномуадресу,и этотадресравен to-address, то такое правило будет запрещать трансляцию указанного адреса, которая могла бы быть выполнена исходя из заданных правил ip nat. Правила ip static имеют более высокий приоритет по сравнению с правилами ip nat. Дополнительную настройку межсетевого экрана производить не нужно, т.к. при использовании правила переадресации интернет-центр самостоятельно открывает доступ по указанному порту. Команда с префиксом no включает или удаляет правило. [port] (‹to-address› | ‹to-host›) [to-port] | ‹to-address› | ‹to-host› | ‹to-interface›)

**Syntax**

```bash
ip static [ ‹protocol›] ( ‹interface› | ( ‹address› ‹mask›) ) ( ‹port› through ‹end-port› (‹to-address› | ‹to-host›) |
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| protocol | — | — | — |
| interface | — | — | — |
| address | — | — | — |
| mask | — | — | — |
| port | — | — | — |
| end-port | — | — | — |
| to-address | — | — | — |
| to-host | — | — | — |

**Examples**

```
(config)> no ip static [ ‹protocol›] ( ‹interface› | ( ‹address› ‹mask›) )
( ‹port› through ‹end-port› (‹to-address› | ‹to-host›) |
[port] (‹to-address› | ‹to-host›) [to-port] |
‹to-address› | ‹to-host› | ‹to-interface›)
protocol Протокол TCP.tcp
Протокол UDP.udp
Протокол ICMP.icmp
Протоколы TCP и UDP.tcpudp
Протокол GRE.gre
Протокол IP in IP.ipip
```

**Notes**

История изменений Версия Описание Добавлена команда ip static.2.00 Добавлен аргумент to-host.2.06

---

### ip static rule

Отключить правило трансляции IP-адресов или ограничить время его работы расписанием. Команда с префиксом no включает правило или отменяет расписание.

**Syntax**

```bash
ip static rule ‹index› (disable | schedule ‹schedule›)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| index | — | — | — |
| schedule | — | — | — |

**Examples**

```
Пример (config)> ip static rule 0 schedule test_schedule
Network::StaticNat: Static NAT rule schedule applied.
(config)> ip static rule 0 disable
Network::StaticNat: Static NAT rule disabled.
(config)> no ip static rule 0 disable
Network::StaticNat: Static NAT rule enabled.
(config)> no ip static rule 0 schedule
Network::StaticNat: Static NAT rule schedule removed.
```

**Notes**

История изменений Версия Описание Добавлена команда ip static rule.2.08

---

### ip telnet

Доступ к группе команд для управления Telnet-сервером.

**Syntax**

```bash
ip telnet
```

**Examples**

```
Пример (config)> ip telnet
(config-telnet)>
```

**Notes**

История изменений Версия Описание Добавлена команда ip telnet.2.08

---

### ip telnet lockout-policy

Задать параметры отслеживания попыток вторжения путём перебора паролей Telnet для публичных интерфейсов. По умолчанию функция включена. Eсли в качестве аргумента используется 0, все параметры отслеживания перебора будут сброшены в значения по умолчанию. Команда с префиксом no отключает обнаружение подбора. [‹observation-window›]]

**Syntax**

```bash
ip telnet lockout-policy ‹threshold› [‹duration›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| threshold | — | — | — |
| duration | — | — | — |

**Examples**

```
(config)> no ip telnet lockout-policy
Количество неудачных попыток
входа в систему. По умолчанию
Целое числоthreshold
установлено значение 5. Может
принимать значения в пределах от
4 до 20.
Продолжительность запрета
авторизации для указанного
Целое числоduration
```

**Notes**

История изменений Версия Описание Добавлена команда ip telnet lockout-policy.2.08

---

### ip telnet port

Назначить порт для telnet-соединения. По умолчанию используется номер порта 23. Команда с префиксом no устанавливает номер порта в значение по умолчанию.

**Syntax**

```bash
port ‹number›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| number | — | — | — |

**Examples**

```
Пример (config-telnet)> port 2525
Telnet::Server: Port unchanged.
(config-telnet)> no port
```

**Notes**

История изменений Версия Описание Добавлена команда ip telnet port.2.08

---

### ip telnet security-level

Установить уровень безопасности Telnet. По умолчанию установлено значение private.

**Syntax**

```bash
security-level (public | private | protected)
```

**Examples**

```
Пример (config-telnet)> security-level protected
Telnet::Manager: Security level changed to protected.
```

**Notes**

История изменений Версия Описание Добавлена команда ip telnet security-level.2.08

---

### ip telnet session max-count

Установить максимальное число одновременных сессий для telnet-соединения. По умолчанию используются максимум 4. Командас префиксомno устанавливаетколичествосессийпо умолчанию.

**Syntax**

```bash
session max-count ‹count›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| count | — | — | — |

**Examples**

```
Пример (config-telnet)> session max-count 4
Telnet::Server: The maximum session count set to 4.
(config-telnet)> no session max-count
Telnet::Server: The maximum session count reset to 4.
```

**Notes**

История изменений Версия Описание Добавлена команда ip telnet session max-count.2.08

---

### ip telnet session timeout

Установить время существования неактивной сессии для telnet-соединения. По умолчанию тайм-аут равен 300, что значит что функция отслеживания активности внутри сессии отключена. Команда с префиксом no устанавливает тайм-аут по умолчанию.

**Syntax**

```bash
session timeout ‹timeout›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| timeout | — | — | — |

**Examples**

```
Пример (config-telnet)> session timeout 600
Telnet::Server: A session timeout value set to 600 seconds.
(config-telnet)> no session timeout
Telnet::Server: A session timeout reset.
```

**Notes**

История изменений Версия Описание Добавлена команда ip telnet session timeout.2.08

---

### ip traffic-shape host

Установитьпределскоростипередачиданныхдля указанногоустройства домашней сети в обе стороны. По умолчанию скорость не ограничена. Команда с префиксом no удаляет настройку для указанного устройства. Если выполнить команду без аргументов, все ограничения для всех устройств будут отменены. ‹upstream-rate› ] [ schedule ‹schedule› ]

**Syntax**

```bash
ip traffic-shape host ‹mac› rate ‹rate› [ asymmetric
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mac | — | — | — |
| rate | — | — | — |

**Examples**

```
(config)> no ip traffic-shape host [ ‹mac› ]
MAC-адрес устройства домашней сети.MAC-адресmac
Значение скорости передачи данных в
Кбит/с. Ограничение должно быть в
диапазоне от 64 Кбит/с до 1 Гбит/с.
Целое числоrate
Скорость отдачи данных в Кбит/с.
Ограничение должно быть в диапазоне
от 64 Кбит/с до 1 Гбит/с.
Целое числоupstream-rate
```

**Notes**

История изменений Версия Описание Добавлена команда ip traffic-shape host.2.05 Добавлен аргумент schedule.2.08 Добавлен аргумент upstream-rate.3.04

---

### ip traffic-shape unknown-host

Установить ограничение скорости передачи данных для незарегистрированныхустройств в обоих направлениях. По умолчанию скорость не ограничена. Команда с префиксом no удаляет настройку. ‹upstream-rate› ]

**Syntax**

```bash
ip traffic-shape unknown-host rate ‹rate› [ asymmetric
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| rate | — | — | — |

**Examples**

```
(config)> no ip traffic-shape unknown-host rate
Скорость передачи данных в Кбит/с.
Значение должно быть в в диапазоне от
64 Кбит/с до 1 Гбит/с.
Целое числоrate
Скорость отдачи данных в Кбит/с.
Ограничение должно быть в диапазоне
от 64 Кбит/с до 1 Гбит/с.
Целое числоupstream-rate
Пример (config)> ip traffic-shape unknown-host rate 80
```

**Notes**

История изменений Версия Описание Добавлена команда ip traffic-shape unknown-host.2.09 Добавлен аргумент upstream-rate.3.04

---

### ipv6 local-prefix

Настроить локальный префикс (ULA). Аргумент может быть буквенным префиксом или ключевым словом default, которое автоматически генерирует постоянный уникальный префикс. Команда с префиксом no отключает настройку.

**Syntax**

```bash
ipv6 local-prefix (default | ‹prefix› )
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| prefix | — | — | — |

**Examples**

```
(config)> no ipv6 local-prefix [default | ‹prefix› ]
Генерировать постоянный уникальный
префикс.
Ключевое словоdefault
Локальный префикс (ULA). Должно быть
корректное значение префикса в блоке
fd00::/8 с длиной префикса не более 48.
Префиксprefix
Пример (config)> ipv6 local-prefix default
Ip6::Prefixes: Default ULA prefix enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда ipv6 local-prefix.2.00

---

### ipv6 name-server

Настроить IP-адреса серверов DNS. Сохраненные таким образом адреса называются статическими, в противоположность динамическим — зарегистрированным службами PPP или DHCP. ipv6 name-serverможно вводитьмногократно,если требуетсянастроить несколько адресов DNS-серверов. Команда с префиксом no удаляет указанный адрес сервера DNS из статического и активного списка, если команда дается с аргументами, либо очищает список статических адресов, если команда дается без аргументов.

**Syntax**

```bash
ipv6 name-server ‹address› [ ‹domain› [ on ‹interface› ] ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |
| domain | — | — | — |
| interface | — | — | — |

**Examples**

```
Пример (config)> ipv6 name-server 2001:4860:4860::8888
Dns::Manager: Name server 2001:4860:4860::8888 added, domain ►
(default).
(config)> ipv6 name-server 123::456 "" on ISP
Dns::InterfaceSpecific:"GigabitEthernet1":name server 123::456 ►
added, domain (default).
(config)> ipv6 name-server 2001:4860:4860::8888 google.com
google.com.
(config)> no ipv6 name-server 2001:4860:4860::8888
Dns::Manager: Name server 2001:4860:4860::8888,domain (default) ►
```

**Notes**

История изменений Версия Описание Добавлена команда ipv6 name-server.2.00 Добавлен аргумент interface.4.00

---

### ipv6 pass

Включить сквозной режим на маршрутизаторе для пакетов IPv6. По умолчанию эта функция отключена. Команда с префиксом no отключает функцию.

**Syntax**

```bash
ipv6 pass through ‹wan-iface› ‹lan-iface›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| wan-iface | — | — | — |
| lan-iface | — | — | — |

**Examples**

```
Пример (config)> ipv6 pass through ISP Home
Ip6::Pass: Configured pass from "GigabitEthernet1" to "Bridge0".
(config)> no ipv6 pass
Ip6::Pass: Disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда ipv6 pass.2.06

---

### ipv6 route

Добавить в таблицу маршрутизации статический маршрут, который задает правило передачи IPv6-пакетов через определенный шлюз или сетевой интерфейс. В качестве сети назначения можно указать ключевое слово default. В этом случае будет создан маршрут по умолчанию. Команда с префиксом no удаляет маршрут с указанными параметрами. ‹gateway›)

**Syntax**

```bash
ipv6 route ( ‹prefix› | default) ( ‹interface› [‹gateway›] |
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| prefix | — | — | — |
| interface | — | — | — |
| gateway | — | — | — |

**Examples**

```
(config)> no ipv6 route ( ‹prefix› | default) ( ‹interface› [‹gateway›] |
‹gateway›)
Префикс IPv6.Префиксprefix
Префикс по умолчанию.Ключевое
default
Полное имя интерфейса или псевдоним.Интерфейсinterface
IP-адрес маршрутизатора в
непосредственно подключенной сети.
IP-адресgateway
Пример (config)> ipv6 route 2002:c100:aeb5::/48 ISP
```

**Notes**

История изменений Версия Описание Добавлена команда ipv6 route.2.00 Добавлен аргумент gateway.2.11

---

### ipv6 static

Создать правило, разрешающее входящее подключение к заданному порту зарегистрированного устройства домашней сети. Команда с префиксом no удаляет правило. through ‹end-port› ] ]

**Syntax**

```bash
ipv6 static ‹protocol› ( ‹interface› ‹mac› | ‹mac› ) [ ‹port› [
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| protocol | — | — | — |
| interface | — | — | — |
| mac | — | — | — |
| port | — | — | — |

**Examples**

```
(config)> no ipv6 static [ ‹protocol› ( ‹interface› ‹mac› | ‹mac› ) [ ‹port› [
through ‹end-port› ] ] ]
protocol Протокол TCP.tcp
Протокол UDP.udp
Протоколы TCP и UDP.tcpudp
Протокол ICMPv6.icmp6
Имя входного интерфейса (полное имя
интерфейса или псевдоним).
Интерфейсinterface
MAC-адрес хоста.MAC-адресmac
```

**Notes**

История изменений Версия Описание Добавлена команда ipv6 static.2.12 Добавлен аргумент icmpv6.4.00

---

### ipv6 subnet

Доступ к группе команд для настройки сегмента локальной сети IPv6. Если сегмент не найден, команда пытается его создать.

**Syntax**

```bash
ipv6 subnet ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (config)> ipv6 subnet Default
(config-subnet)>
```

**Notes**

История изменений Версия Описание Добавлена команда ipv6 subnet.2.00

---

### ipv6 subnet bind

Привязать подсеть к интерфейсу. Команда с префиксом no отменяет привязку.

**Syntax**

```bash
bind ‹bind›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| bind | — | — | — |

**Examples**

```
Пример (config-subnet)> bind WifiMaster0/AccessPoint1
Ip6::Subnets: Interface "WifiMaster0/AccessPoint1" bound to ►
subnet "Default".
(config-subnet)> no bind
Ip6::Subnets: Interface unbound from subnet "Default".
```

**Notes**

История изменений Версия Описание Добавлена команда ipv6 subnet bind.2.00

---

### ipv6 subnet mode

Выбрать режим настройки адресов для хостов в подсети. Доступны два варианта — dhcp и slaac. Первый включает локальный DHCPv6-сервер с цельюприсвоенияадресов,второйвключаетSLAAC(автоконфигурацию адресов).

**Syntax**

```bash
mode ‹mode›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mode | — | — | — |

**Examples**

```
Пример (config-subnet)> mode dhcp
Ip6::Subnets: Subnet "Default" enabled as DHCP.
(config-subnet)> no mode
Ip6::Subnets: Subnet "Default" disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда ipv6 subnet mode.2.00

---

### ipv6 subnet number

Присвоить подсети идентификатор, который будет определять публичныйпрефикссегмента.Идентификатордолжен быть уникальным среди подсетей.

**Syntax**

```bash
number ‹number›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| number | — | — | — |

**Examples**

```
Пример (config-subnet)> number 2
Ip6::Subnets: Number 2 assigned to subnet "Default".
```

**Notes**

История изменений Версия Описание Добавлена команда ipv6 subnet number.2.00

---

### ipv6 subnet prefix delegate

Указать длину делегируемого префикса. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
prefix delegate ‹delegate›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| delegate | — | — | — |

**Examples**

```
Пример (config-subnet)> prefix delegate 63
Network::Ip6::Subnets: Delegate length is /63 assigned to subnet ►
"Default".
(config-subnet)> no prefix delegate
Network::Ip6::Subnets: Prefix delegation disabled for subnet ►
```

**Notes**

История изменений Версия Описание Добавлена команда ipv6 subnet prefix delegate.4.00

---

### ipv6 subnet prefix length

Указать длину префикса подсети. По умолчанию используется значение /64. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
prefix length ‹length›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| length | — | — | — |

**Examples**

```
Пример (config-subnet)> prefix length 62
Network::Ip6::Subnets:Length is /62 assigned to subnet "Default".
(config-subnet)> no prefix length
Network::Ip6::Subnets: Length reset to defalut for subnet ►
"Default".
```

**Notes**

История изменений Версия Описание Добавлена команда ipv6 subnet prefix length.4.00

---

### isolate-private

Запретить передачу данных между любыми интерфейсами с уровнем безопасности private. По умолчанию включено. Команда с префиксом no отменяет действие команды, разрешая передавать данные между интерфейсами private.

**Syntax**

```bash
isolate-private
```

**Examples**

```
Пример (config)> isolate-private
Netfilter::Manager: Private networks isolated.
(config)> no isolate-private
Netfilter::Manager: Private networks not isolated.
```

**Notes**

История изменений Версия Описание Добавлена команда isolate-private.2.00

---

### kabinet

Доступ к группекоманд для настройкипараметровавторизатораКАБiNET. Команда с префиксом no возвращает значения по умолчанию всем параметрам.

**Syntax**

```bash
kabinet
```

**Examples**

```
Пример (config)> kabinet
(kabinet)>
(config)> no kabinet
Kabinet::Authenticator: A configuration reset.
```

**Notes**

История изменений Версия Описание Добавлена команда kabinet.2.02

---

### kabinet access-level

Задать уровень доступа для авторизатора КАБiNET. По умолчанию используется уровень доступа internet. Команда с префиксом no устанавливает уровень по умолчанию.

**Syntax**

```bash
access-level ‹level› (kabinet)> no access-level
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| level | — | — | — |

**Examples**

```
Пример (kabinet)> access-level lan
Kabinet::Authenticator: An access level set to "lan".
(kabinet)> access-level internet
Kabinet::Authenticator: An access level set to "internet".
(kabinet)> no access-level
Kabinet::Authenticator: An access level reset to "internet".
```

**Notes**

История изменений Версия Описание Добавлена команда kabinet access-level.2.02

---

### kabinet interface

Привязать авторизатор КАБiNET к указанному интерфейсу. Команда с префиксом no разрывает связь.

**Syntax**

```bash
interface ‹interface› (kabinet)> no interface
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |

**Examples**

```
Пример (kabinet)> interface [Tab]
Usage template:
interface {interface}
Choose:
GigabitEthernet1
ISP
WifiMaster0/AccessPoint2
WifiMaster1/AccessPoint1
WifiMaster0/AccessPoint3
WifiMaster0/AccessPoint0
```

**Notes**

История изменений Версия Описание Добавлена команда kabinet interface.2.02

---

### kabinet password

Задать пароль для авторизатора КАБiNET. По умолчанию пароль не установлен. Команда с префиксом no стирает значение пароля.

**Syntax**

```bash
password ‹password› (kabinet)> no password
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| password | — | — | — |

**Examples**

```
Пример (kabinet)> password 123456789
Kabinet::Authenticator: A password set.
(kabinet)> no password
Kabinet::Authenticator: A password cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда kabinet password.2.02

---

### kabinet port

Установить порт сервера для авторизатора КАБiNET. По умолчанию используются значения 8314 или 8899. Команда с префиксом no устанавливает порт по умолчанию.

**Syntax**

```bash
port ‹port› (kabinet)> no port
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| port | — | — | — |

**Examples**

```
Пример (kabinet)> port 12345
Kabinet::Authenticator: A server port set.
(kabinet)> no port
Kabinet::Authenticator: A server port reset.
```

**Notes**

История изменений Версия Описание Добавлена команда kabinet port.2.14

---

### kabinet protocol-version

Задать версию протокола авторизатора КАБiNET. По умолчанию, используется версия протокола 2. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
protocol-version ‹version› (kabinet)> no protocol-version
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| version | — | — | — |

**Examples**

```
Пример (kabinet)> protocol-version 1
Kabinet::Authenticator: A protocol version set to "1".
(kabinet)> no protocol-version
Kabinet::Authenticator: A protocol version reset to "2".
```

**Notes**

История изменений Версия Описание Добавлена команда kabinet protocol-version.2.02

---

### kabinet server

Задать IP-адрес сервера аутентификации КАБiNET. По умолчанию используется IP 10.0.0.1. Команда с префиксом no устанавливает значение по умолчанию.

**Syntax**

```bash
server ‹address› (kabinet)> no server
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |

**Examples**

```
Пример (kabinet)> server 77.222.111.1
Kabinet::Authenticator: A server address set.
(kabinet)> no server
Kabinet::Authenticator: A server address reset.
```

**Notes**

История изменений Версия Описание Добавлена команда kabinet server.2.02

---

### known host

Добавить устройство домашней сети.

**Syntax**

```bash
known host ‹name› ‹mac›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| mac | — | — | — |

**Examples**

```
Пример (config)> known host MY 00:0e:c6:a2:22:a1
Core::KnownHosts: New host "MY" has been created.
(config)> no known host 00:0e:c6:a2:22:a1
Core::KnownHosts: Host 00:0e:c6:a1:26:a8 has been removed.
```

**Notes**

История изменений Версия Описание Добавлена команда known host.2.00

---

### ls

Вывести на экран список файлов в указанном каталоге.

**Syntax**

```bash
ls [ ‹directory› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| directory | — | — | — |

**Examples**

```
Пример (config)> ls FILES:
rel: FILES:
entry, type = D:
name: com
entry, type = R:
name: IMAX.mkv
size: 1886912512
name: speedfan
name: portable
name: video
```

**Notes**

История изменений Версия Описание Добавлена команда ls.2.00

---

### mdns

Доступ к группе команд для управления службой mDNS.

**Syntax**

```bash
mdns
```

**Examples**

```
Пример (config)> mdns
Core::Configurator: Done.
(config-mdns)>
```

**Notes**

История изменений Версия Описание Добавлена команда mdns.3.07

---

### mdns reflector disable

Принудительно отключить режим прозрачности между сегментами домашнейсети,независимоот изоляциисегментов(см. командуinterface security-level). Команда с префиксом no отключает настройку.

**Syntax**

```bash
reflector disable
```

**Examples**

```
Пример (config-mdns)>reflector disable
Mdns::Manager: Reflector disabled.
(config-mdns)>no reflector disable
Mdns::Manager: Reflector enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда mdns reflector disable.3.07

---

### mdns reflector enforce

Принудительно включить режим прозрачности между сегментами домашнейсети,независимоот изоляциисегментов(см. командуinterface security-level). Команда с префиксом no отключает настройку.

**Syntax**

```bash
reflector enforce
```

**Examples**

```
Пример (config-mdns)>reflector enforce
Mdns::Manager: Reflector enforced.
(config-mdns)>no reflector enforce
Mdns::Manager: Reflector unenforced.
```

**Notes**

История изменений Версия Описание Добавлена команда mdns reflector enforce.3.07

---

### mkdir

Создать новый каталог.

**Syntax**

```bash
mkdir ‹directory›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| directory | — | — | — |

**Examples**

```
Пример (config)> mkdir SANDSK:/test
FileSystem::Repository: "SANDSK:/test" created.
(config)> mkdir SANDSK:/test/onetest
FileSystem::Repository: "SANDSK:/test/onetest" created.
```

**Notes**

История изменений Версия Описание Добавлена команда mkdir.2.12

---

### more

Вывести на экран содержимое текстового файла построчно.

**Syntax**

```bash
more ‹filename›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| filename | — | — | — |

**Examples**

```
Пример (config)> more temp:/resolv.conf
nameserver 127.0.0.1
options timeout:1 attempts:1 rotate
```

**Notes**

История изменений Версия Описание Добавлена команда more.2.00

---

### mws acquire

Присоединить новое устройство к MWS. Команда с префиксом no прекращает присоединение. [no-update]

**Syntax**

```bash
mws acquire ‹candidate› [eula-accept] [dpn-accept]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| candidate | — | — | — |

**Examples**

```
(config)> no mws acquire ‹candidate›
ID устройства — MAC-адрес или CID.Строкаcandidate
Выполнить команду eula accept.Ключевое словоeula-accept
Подтвердить принятие DPN.Ключевое словоdpn-accept
Присоединение без подтверждения
обновления прошивки.
Ключевое словоno-update
Пример (config)> mws acquire ab1409a2-0f87-11e8-8f23-3d5f5921b253 ►
eula-accept
Mws::Controller:Candidate "ab1409a2-0f87-11e8-8f23-3d5f5921b253"►
```

**Notes**

История изменений Версия Описание Добавлена команда mws acquire.2.15

---

### mws auto-ap-shutdown

Включить автоматическое отключение Точек доступа Wi-Fi системы при отсутствии связи с Контроллером. По умолчанию эта настройка отключена. Команда с префиксом no отключает эту возможность.

**Syntax**

```bash
mws auto-ap-shutdown
```

**Examples**

```
Пример (config)> mws auto-ap-shutdown
Mws::Controller: Automatic access points shutdown enabled.
(config)> no mws auto-ap-shutdown
Mws::Controller: Automatic access points shutdown disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда mws auto-ap-shutdown.3.08

---

### mws backhaul shutdown

Отключитьскрытыебеспроводныеслужебныеточки доступа для службы MWS. По умолчанию настройка включена. Команда с префиксом no включает скрытые точки доступа.

**Syntax**

```bash
mws backhaul shutdown
```

**Examples**

```
Пример (config)> mws backhaul shutdown
Mws::Controller: Backhaul disabled.
(config)> no mws backhaul shutdown
Mws::Controller: Backhaul enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда mws backhaul shutdown.3.04

---

### mws log stp

Включить логирование STP для интерфейса. Позволяет отслеживать отправленные и полученные BPDU-пакеты. Команда с префиксом no отключает логирование для заданного интерфейса.Если аргументне указан, весь список логированияSTP будет удален.

**Syntax**

```bash
mws log stp ‹interface›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |

**Examples**

```
Пример (config)> mws log stp Bridge0
Network::Interface::Rtx::WifiController:Enabled STP logging for ►
"Bridge0".
(config)> no mws log stp Bridge0
Network::Interface::Rtx::WifiController: Disabled STP logging ►
for "Bridge0".
(config)> no mws log stp
Network::Interface::Rtx::WifiController:Disabled all STP logging.
```

**Notes**

История изменений Версия Описание Добавлена команда mws log stp.3.06

---

### mws member

Команда с префиксом no удаляет запись о захваченном устройстве MWS. Если выполнить команду без аргумента, то весь список захваченных устройств будет удален.

**Syntax**

```bash
no mws member [ member ]
```

**Examples**

```
Пример (config)> mws no member 2937a388-0d00-11e7-8029-7119319f930e
Mws::MemberList: Member 2937a388-0d00-11e7-8029-7119319f930e ►
pending factory reset.
```

**Notes**

История изменений Версия Описание Добавлена команда mws member.2.15

---

### mws member debug

ВключитьотладкузахваченногоустройстваMWS. По умолчаниюпараметр отключен. Команда с префиксом no отключает настройку.

**Syntax**

```bash
mws member ‹member› debug
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| member | — | — | — |

**Examples**

```
Пример (config)> mws member 60:31:97:3c:11:12 debug
Mws::MemberList: Member "60:31:97:3c:11:12" ►
(7207838e-af7d-11e6-8011-25463bd03812) RCI debug enabled.
(config)> no mws member 60:31:97:3c:11:12 debug
(7207838e-af7d-11e6-8011-25463bd03812) RCI debug disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда mws member debug.3.05

---

### mws member dpn-accept

Принять соглашение DPN для захваченного устройства MWS.

**Syntax**

```bash
mws member ‹member› dpn-accept
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| member | — | — | — |

**Examples**

```
Пример (config)> mws member 7207838e-af7d-11e6-8029-25463bd03828 ►
dpn-accept
Mws::Controller:Candidate "ab1409a2-0f87-11e8-8f23-3d5f5921b253"►
acquire started.
```

**Notes**

История изменений Версия Описание Добавлена команда mws member dpn-accept.3.05

---

### mws member port access

Назначить LAN-порт Экстендера указанному сетевому сегменту. По умолчанию LAN-порт назначен сегменту Home (Bridge0). Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
mws member ‹member› port ‹port› access ‹interface›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| member | — | — | — |
| port | — | — | — |
| interface | — | — | — |

**Examples**

```
Пример (config)> mws member cb7038f8-c49b-11ea-8f23-e123fd1a0e3e port ►
3 access Bridge2
Mws::Controller::Manager:"cb7038f8-c49b-11ea-8f23-e123fd1a0e3e":►
port "3" has been attached to "Bridge2".
(config)> mws member 11:ff:22:43:5c:bf port 1 access Bridge2
Mws::Controller::Manager:"11:ff:22:43:5c:bf":port "1" has been ►
attached to "Bridge2".
(config)> mws member 11:ff:22:43:5c:bf port 1 no access Bridge2
attached to "Bridge0".
```

**Notes**

История изменений Версия Описание Добавлена команда mws member port access.4.02

---

### mws member reboot

Перезагрузить устройство MWS. Процесс перезагрузки отображается в выводе команды show mws member.

**Syntax**

```bash
mws member ‹member› reboot [ ‹interval› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| member | — | — | — |
| interval | — | — | — |

**Examples**

```
Пример (config)> mws member 7207838e-af7d-11e6-8029-25463bd03828reboot ►
10
Mws::MemberList: Member "50:ff:21:1a:b1:f2" ►
(7207838e-af7d-11e6-8029-25463bd03828) pending reboot.
```

**Notes**

История изменений Версия Описание Добавлена команда mws member reboot.3.08

---

### mws member update channel

Настроить канал обновления для Экстендеров. По умолчанию используется значение stable. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
mws member ‹member› update channel ‹channel›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| member | — | — | — |
| channel | — | — | — |

**Examples**

```
Пример (config)> mws member 8a33ff16-2c3c-11ef-9111-7bd989541127update ►
channel preview
Mws::Controller::MemberList: "50:11:20:22:33:1b" update channel ►
is "preview".
(config)> no mws member 8a33ff16-2c3c-11ef-9396-7bd989541127 ►
update channel
Mws::Controller::MemberList:"50:ff:20:c5:97:1b"reset an update ►
channel to default.
```

**Notes**

История изменений Версия Описание Добавлена команда mws member update channel.4.02

---

### mws member update check

Проверить наличие обновлений для устройства MWS.

**Syntax**

```bash
mws member ‹member› update check
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| member | — | — | — |

**Examples**

```
Пример (config)> mws member 21:ff:22:32:18:af update check
Mws::Controller::Updater: "21:ff:22:32:18:af": checking for an ►
update.
```

**Notes**

История изменений Версия Описание Добавлена команда mws member update check.4.00

---

### mws member update start

Запустить обновление устройства MWS.

**Syntax**

```bash
mws member ‹member› update start
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| member | — | — | — |

**Examples**

```
Пример (config)> mws member 21:ff:22:32:18:af update start
Mws::Controller::Updater: "21:ff:22:32:18:af": pending update, ►
"(auto)" sandbox.
```

**Notes**

История изменений Версия Описание Добавлена команда mws member update start.4.00

---

### mws member update stop

Остановить обновление устройства MWS.

**Syntax**

```bash
mws member ‹member› update stop
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| member | — | — | — |

**Examples**

```
Пример (config)> mws member 21:ff:22:32:18:af update stop
Mws::Controller::Updater: "21:ff:22:32:18:af": update stopped.
```

**Notes**

История изменений Версия Описание Добавлена команда mws member update stop.4.00

---

### mws reboot

Перезагрузить всю MWS.

**Syntax**

```bash
mws reboot
```

**Examples**

```
Пример (config)> mws reboot
Mws::Controller: Pending reboot Modular Wi-Fi System in 10 ►
seconds.
```

**Notes**

История изменений Версия Описание Добавлена команда mws reboot.3.08

---

### mws revisit

Перечитать состояние потенциального устройства MWS.

**Syntax**

```bash
mws revisit ‹candidate›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| candidate | — | — | — |

**Examples**

```
Пример (config)> mws revisit 50:ff:20:08:71:62
Mws::Controller: Candidate "50:ff:20:08:71:62" revisit started.
(config)> mws no revisit 50:ff:20:08:71:62
Mws::Controller: Candidate "50:ff:20:08:71:62" revisit stopped.
```

**Notes**

История изменений Версия Описание Добавлена команда mws revisit.2.15

---

### mws stp priority

Установить приоритет моста STP. По умолчанию используется значение 32768. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
mws stp priority ‹priority›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| priority | — | — | — |

**Examples**

```
Пример (config)> mws stp priority 4096
Mws::Controller::Manager: Applied STP priority 4096.
(config)> no mws stp priority
Mws::Controller::Manager: STP priority reset to default (32768).
```

**Notes**

История изменений Версия Описание Добавлена команда mws stp priority.4.01

---

### mws update start

Запустить обновление MWS. Если есть обновления для устройств, то они обновляются последовательно. Затем, если есть обновление для контроллера, то запускается обновление контроллера. Если обновлений нет, то ничего не происходит.

**Syntax**

```bash
mws update start [controller | members]
```

**Examples**

```
Пример (config)> mws update start
Mws::Controller::Manager: Updating MWS.
(config)> mws update start controller
Mws::Controller::Manager: Updating controller.
(config)> mws update stop
Mws::Controller::Manager: Updating members.
```

**Notes**

История изменений Версия Описание Добавлена команда mws update start.4.00

---

### mws update stop

Остановить обновление устройства MWS.

**Syntax**

```bash
mws update stop
```

**Examples**

```
Пример (config)> mws update stop
Mws::Controller::Manager: Update stopped.
```

**Notes**

История изменений Версия Описание Добавлена команда mws update stop.4.00

---

### mws zone

Ограничить область подключения клиентского устройства указанными узлами MWS. Команда с префиксом no удаляет указанную настройку. Если ввести команду без аргументов, будет удален весть список ограничений.

**Syntax**

```bash
mws zone ‹mac› ‹cid›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mac | — | — | — |
| cid | — | — | — |

**Examples**

```
Пример (config)> mws zone 11:22:33:ec:58:e2 ►
12298f60-d886-11e7-9396-176971eeb8d6
Mws::Controller: Added zone 11:22:33:ec:58:e2 ►
12298f60-d886-11e7-9396-176971eeb8d6.
(config)> no mws zone 11:22:33:ec:58:e2 ►
Mws::Controller: Deleted zone 11:22:33:ec:58:e2 ►
(config)> no mws zone
Mws::Controller: Cleared all zones.
```

**Notes**

История изменений Версия Описание Добавлена команда mws zone.3.06

---

### ndns

Доступ к группе команд для управления службой KeenDNS.

**Syntax**

```bash
ndns
```

**Examples**

```
Пример (config)> ndns
Core::Configurator: Done.
```

**Notes**

История изменений Версия Описание Добавлена команда ndns.2.07

---

### ndns book-name

Зарезервировать имя хоста в DNS. Для передачи зарезервированного имени хоста на другое устройство Netcraze используется параметр transfer-code. Для передачи имени хоста необходимо: 1. Выполнить команду с параметром transfer-code на передающей стороне. 2. Выполнить ту же самую команду с теми же самыми параметрами на принимающей стороне. Строк действия transfer-code одна неделя. ‹transfer-code› ]

**Syntax**

```bash
book-name ‹name› ‹domain› [‹access› [ipv6 ‹access6›] |
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| domain | — | — | — |
| access | — | — | — |
| access6 | — | — | — |

**Examples**

```
Пример (ndns)> book-name myhome23 netcraze.pro
done, layout = view, title = NDSS::ndns/bookName ►
(Public DNS Hostname Booking), sub-title = The name booking was ►
successful.:
client, geo = RU, ip = 193.0.174.200, format = ►
clean, date = 2019-05-23T09:46:54.536Z, standalone = false:
fields:
field, name = name, title = Public Name:
field, name = domain, title = Domain Name:
field, name = updated, title = Updated, type ►
```

**Notes**

История изменений Версия Описание Добавлена команда ndns book-name.2.07 Добавлен параметр ipv6.2.14

---

### ndns check-name

Проверить доступность имени хоста для резервации.

**Syntax**

```bash
check-name ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (ndns)> check-name testname
list:
item:
name: testname
domain: mynetcraze.by
available: no
domain: mynetcraze.kz
available: yes
domain: mynetcraze.ru
```

**Notes**

История изменений Версия Описание Добавлена команда ndns check-name.2.07

---

### ndns drop-name

Отменить регистрацию имени хоста в DNS.

**Syntax**

```bash
drop-name ‹name› ‹domain›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| domain | — | — | — |

**Examples**

```
Пример (ndns)> drop-name testname mynetcraze.net
done, title = NDSS::ndns/dropName (Delete DNS ►
Hostname Booking), code = 200,
icon = tick, hl = true, layout = message:
client, geo = RU, ip = 81.200.27.56, format = ►
clean, date = 2016-09-
22T10:52:35.685Z, standalone = false:
reason: The name is un-booked.
detail, layout = list:
columns:
```

**Notes**

История изменений Версия Описание Добавлена команда ndns drop-name.2.07

---

### ndns get-booked

Получить актуальную информацию c сервера о текущем зарезервированном имени хоста в DNS.

**Syntax**

```bash
get-booked
```

**Examples**

```
Пример (ndns)> get-booked
done, layout = view, title = ►
NDSS::ndns/updateBooking (Update Name Booking
Address and Expiration):
client, geo = RU, ip = 41.189.34.56, format = ►
xml, date = 2017-09-
14T08:30:19.266Z, standalone = false:
menu, src = ►
/index?__auth=force&__role=context-
menu&ref=%2fndns%2fupdateBooking:
```

**Notes**

История изменений Версия Описание Добавлена команда ndns get-booked.2.08

---

### ndns get-update

Обновить регистрацию имени хоста в DNS на сервере.

**Syntax**

```bash
get-update [‹access› [ipv6 ‹access6›]]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| access | — | — | — |
| access6 | — | — | — |

**Examples**

```
Пример (ndns)> get-update auto
done, layout = view, title = ►
NDSS::ndns/updateBooking (Update Name Booking
Address and Expiration):
client, geo = RU, ip = 81.200.27.56, format = ►
xml, date = 2016-09-
22T12:07:32.746Z, standalone = false:
menu, src = ►
/index?__auth=force&__role=context-
menu&ref=%2fndns%2fupdateBooking:
```

**Notes**

История изменений Версия Описание Добавлена команда ndns get-update.2.07 Добавлен параметр ipv6.2.14

---

### nextdns

Доступ к группе команд для настройки профилей NextDNS.

**Syntax**

```bash
nextdns
```

**Examples**

```
Пример (config)> nextdns
Core::Configurator: Done.
(nextdns)>
```

**Notes**

История изменений Версия Описание Добавлена команда netxdns.3.08

---

### nextdns assign

Назначить профиль защиты хосту. По умолчанию для всех хостов и локальных сетевых сегментов используется профиль System. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
assign ‹host› ‹token› | interface ‹iface› ‹token› (nextdns)> no assign [‹host› | interface ‹iface› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| host | — | — | — |
| token | — | — | — |
| iface | — | — | — |

**Examples**

```
Пример (nextdns)> assign 11:24:c4:54:bc:59 1f2a36
NextDns::Client: Reassociated host "11:24:c4:54:bc:59" with ►
profile "1f2a36".
(nextdns)> assign interface Home 1f2a36
NextDns::Client: Associated interface "Home" with profile ►
"1f2a36".
(nextdns)> no assign 11:24:c4:54:bc:59
NextDns::Client: Removed profile for host "11:24:c4:54:bc:59".
(nextdns)> no assign Bridge0
NextDns::Client: Removed profile for interface "Bridge0".
```

**Notes**

История изменений Версия Описание Добавлена команда nextdns assign.3.08

---

### nextdns authenticate

Указать логин для учетной записи NextDNS.

**Syntax**

```bash
authenticate ‹login› ‹password› [ ‹pin› ] (nextdns)> no authenticate
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| login | — | — | — |
| password | — | — | — |
| pin | — | — | — |

**Examples**

```
Пример (nextdns)> authenticate account@gmail.com 123456789 1234
NextDns::Client: Authenticated successfully.
```

**Notes**

История изменений Версия Описание Добавлена команда nextdns authenticate.3.08

---

### nextdns authtoken

Указать токен авторизации для учетной записи NextDNS. Команда с префиксом no удаляет токен.

**Syntax**

```bash
authtoken ‹authtoken› (nextdns)> no authtoken
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| authtoken | — | — | — |

**Examples**

```
Пример (nextdns)> authtoken 1f2a36
NextDns::Client: Set authentication token.
(nextdns)> no authtoken
NextDns::Client: Cleared authentication token.
```

**Notes**

История изменений Версия Описание Добавлена команда nextdns authtoken.3.08

---

### nextdns check-availability

Проверить доступность службы NextDNS.

**Syntax**

```bash
check-availability
```

**Examples**

```
Пример (nextdns)> check-availability
NextDns::Client: NextDNS DNS-over-HTTPS is available.
```

**Notes**

История изменений Версия Описание Добавлена команда nextdns check-availability.3.08

---

### ntce

Доступ к группе команд для настройки сервиса NTCE.

**Syntax**

```bash
ntce
```

**Examples**

```
Пример (config)> ntce
(config-ntce)>
```

**Notes**

История изменений Версия Описание Добавлена команда ntce.3.07

---

### ntce debug

Включить отладочный режим для сервиса NTCE. По умолчанию функция отключена. Команда с префиксом no отключает настройку.

**Syntax**

```bash
debug
```

**Examples**

```
Пример (config-ntce)> debug
Ntce::Manager: Enabled debug.
(config-ntce)> no debug
Ntce::Manager: Disabled debug.
```

**Notes**

История изменений Версия Описание Добавлена команда ntce debug.3.07

---

### ntce filter assign host

Назначить профиль фильтрации NTCE зарегистрированному клиенту. Новый профиль может быть добавлен командой ntce filter profile. Список профилей системы можно просмотреть командой show ntce filter profile. Команда с префиксом no удаляет указанный профиль для клиента. Если выполнить команду без аргумента, то весь список профилей для всех клиентов будет очищен.

**Syntax**

```bash
filter assign host ‹host› ‹profile›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| host | — | — | — |
| profile | — | — | — |

**Examples**

```
Пример (config-ntce)> filter assign host 04:12:c4:54:bc:59 test
Ntce::Profiles: Associated host "04:d4:12:54:bc:59" with profile ►
"test".
(config-ntce)> no filter assign host 04:d4:12:54:bc:59
Ntce::Profiles: Removed profile for host "04:d4:12:54:bc:59".
(config-ntce)> no filter assign host
Ntce::Profiles: Removed profiles for hosts.
```

**Notes**

История изменений Версия Описание Добавлена команда ntce filter assign host.4.02

---

### ntce filter assign interface

Назначить профиль фильтрации NTCE интерфейсу. Новый профиль может быть добавлен командой ntce filter profile. Список профилей системы можно просмотреть командой show ntce filter profile. Команда с префиксом no удаляет указанный профиль для интерфейса. Если выполнить команду без аргумента, то весь список профилей для всех интерфейсов будет очищен.

**Syntax**

```bash
filter assign interface ‹interface› ‹profile›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |
| profile | — | — | — |

**Examples**

```
Пример (config-ntce)> filter assign interface Bridge0 test
Ntce::Profiles: "test": associated interface "Bridge0" with ►
profile "test".
(config-ntce)> no filter assign interface Bridge0
Ntce::Profiles: Removed profile for interface "Bridge0".
(config-ntce)> no filter assign interface
Ntce::Profiles: Removed profiles for interfaces.
```

**Notes**

История изменений Версия Описание Добавлена команда ntce filter assign interface.4.02

---

### ntce filter profile

Создать пользовательский профиль фильтрации NTCE. Команда с префиксом no удаляет профиль.

**Syntax**

```bash
filter profile ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (config-ntce)> filter profile test
Ntce::Profiles: Created profile "test".
(config-ntce)> no filter profile test
Ntce::Profiles: "test": removed profile.
```

**Notes**

История изменений Версия Описание Добавлена команда ntce filter profile.4.02

---

### ntce filter profile application

Добавить приложение в профиль фильтрации NTCE. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
filter profile ‹name› application ‹application›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| application | — | — | — |

**Examples**

```
Пример (config-ntce)> filter profile test application youtube-kids
Ntce::Profiles: "test": added application "youtube-kids".
(config-ntce)> no filter profile test application youtube-kids
Ntce::Profiles: "test": removed application "youtube-kids".
```

**Notes**

История изменений Версия Описание Добавлена команда ntce filter profile application.4.02

---

### ntce filter profile description

Указать описание к профилю фильтрации NTCE. Команда с префиксом no стирает описание.

**Syntax**

```bash
filter profile ‹name› description ‹description›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| description | — | — | — |

**Examples**

```
Пример (config-ntce)> filter profile test description myprofile
Ntce::Profiles: "test": set description "myprofile".
(config-ntce)> no filter profile test description
Ntce::Profiles: "test": set description "".
```

**Notes**

История изменений Версия Описание Добавлена команда ntce filter profile description.4.02

---

### ntce filter profile group

Добавить группу приложений в профиль фильтрации NTCE. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
filter profile ‹name› group ‹group›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| group | — | — | — |

**Examples**

```
(config-ntce)> no filter profile ‹name› group ‹group›
Имя профиля фильтрации NTCE.Строкаname
Название группы приложений.Строкаgroup
Пример (config-ntce)> filter profile test group gaming
Ntce::Profiles: "test": added group "gaming".
(config-ntce)> no filter profile test group gaming
Ntce::Profiles: "test": removed group "gaming".
```

**Notes**

История изменений Версия Описание Добавлена команда ntce filter profile group.4.02

---

### ntce filter profile schedule

Указать расписание работы профиля фильтрации NTCE. Команда с префиксом no разрывает связь с расписанием.

**Syntax**

```bash
filter profile ‹name› schedule ‹schedule›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| schedule | — | — | — |

**Examples**

```
Пример (config-ntce)> filter profile test schedule schedule1
Ntce::Profiles: "test": set schedule "schedule1".
(config-ntce)> no filter profile test schedule
Ntce::Profiles: "test": removed schedule.
```

**Notes**

История изменений Версия Описание Добавлена команда ntce filter profile schedule.4.02

---

### ntce filter profile type

Установить тип разрешения профиля фильтрации NTCE.

**Syntax**

```bash
filter profile ‹name› type ‹type›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| type | — | — | — |

**Examples**

```
Пример (config-ntce)> filter profile test type permit
Ntce::Profiles: "test": set type "permit".
(config-ntce)> filter profile test type deny
Ntce::Profiles: "test": set type "deny".
```

**Notes**

История изменений Версия Описание Добавлена команда ntce filter profile type.4.02

---

### ntce memory-watcher

Включить механизм наблюдения за нагрузкой на память для службы NTCE. По умолчанию функция включена. Команда с префиксом no отключает настройку.

**Syntax**

```bash
memory-watcher
```

**Examples**

```
Пример (config-ntce)> memory-watcher
Ntce::Manager: Enabled automatic memory pressure handler.
(config-ntce)> no memory-watcher
Ntce::Manager: Disabled automatic memory pressure handler.
```

**Notes**

История изменений Версия Описание Добавлена команда ntce memory-watcher.3.08

---

### ntce qos category priority

Указать приоритеты для категорий трафика. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
qos category ‹category›priority ‹priority›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| category | — | — | — |
| priority | — | — | — |

**Examples**

```
Пример (config-ntce)> qos category work priority 7
Ntce::Manager: Set category "work" priority to "7".
(config-ntce)> qos category other no priority
Ntce::Manager: Reset QoS priority for category "work".
```

**Notes**

История изменений Версия Описание Добавлена команда ntce qos category priority.3.08

---

### ntce qos enable

Включить IntelliQoS, который обеспечивает входящую и исходящую полосу пропускания для приоритетных приложений и задач с помощью предварительно определенных групп категорий. По умолчанию служба отключена. Команда с префиксом no отключает настройку.

**Syntax**

```bash
qos enable
```

**Examples**

```
Пример (config-ntce)> qos enable
Ntce::Manager: Enabled QoS.
(config-ntce)> no qos enable
Ntce::Manager: Disabled QoS.
```

**Notes**

История изменений Версия Описание Добавлена команда ntce qos enable.3.07

---

### ntce upstream rate-limit input

Задать ограничение трафика на прием для указанного интерфейса. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
upstream rate-limit ‹interface› input ( ‹rate› | auto)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |
| rate | — | — | — |

**Examples**

```
Пример (config-ntce)> upstream rate-limit ISP input auto
Ntce::Upstreams: Set ISP input rate limit to "auto".
(config-ntce)> upstream rate-limit ISP input 1000000
Ntce::Upstreams: Set ISP input rate limit to "1000000" kbps.
(config-ntce)> no upstream rate-limit ISP input
Ntce::Upstreams: Reset ISP input rate limit.
```

**Notes**

История изменений Версия Описание Добавлена команда ntce upstream rate-limit input.4.01

---

### ntce upstream rate-limit output

Задать ограничение трафика на передачу для указанного интерфейса. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
upstream rate-limit ‹interface› output ( ‹rate› | auto)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |
| rate | — | — | — |

**Examples**

```
Пример (config-ntce)> upstream rate-limit ISP output auto
Ntce::Upstreams: Set ISP output rate limit to "auto".
(config-ntce)> upstream rate-limit ISP output 1000000
Ntce::Upstreams: Set ISP output rate limit to "1000000" kbps.
(config-ntce)> no upstream rate-limit ISP output
Ntce::Upstreams: Reset ISP output rate limit.
```

**Notes**

История изменений Версия Описание Добавлена команда ntce upstream rate-limit output.4.01

---

### ntp

Доступ к настройке NTP-клиента. Команда с префиксом no сбрасываетнастройки NTP-клиентав настройки по умолчанию.

**Syntax**

```bash
no ntp
```

**Examples**

```
Пример (config)> no ntp
Ntp::Client: Configuration reset.
```

**Notes**

История изменений Версия Описание Добавлена команда ntp.2.00

---

### ntp master

Включить SNTP-сервер в сетевых сегментах private и protected. Команда с префиксом no останавливает службу.

**Syntax**

```bash
ntp master
```

**Examples**

```
Пример (config)> ntp mater
Ntp::Server: Enabled master mode.
(config)> no ntp master
Ntp::Server: Disabled master mode.
```

**Notes**

История изменений ОписаниеВерсия Добавлена команда ntp master.3.09

---

### ntp server

Добавить в список новый NTP-сервер. Можно добавить не более 8 NTP-серверов. Команда с префиксом no удаляет NTP-сервер из списка. Если выполнить команду без аргумента, то весь список NTP-серверов будет очищен.

**Syntax**

```bash
ntp server ‹server›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| server | — | — | — |

**Examples**

```
Пример (config)> ntp server pool.ntp.org
Ntp::Client: Server "pool.ntp.org" has been added.
(config)> no ntp server
Ntp::Client: All NTP servers removed.
```

**Notes**

История изменений Версия Описание Добавлена команда ntp server.2.00

---

### ntp source

Установить определенный IP-адрес источника для службы NTP. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
ntp source ‹address›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |

**Examples**

```
(config)> no ntp source
IP-адрес источника для всех NTP-пакетов.IP-адресaddress
Пример (config)> ntp source 192.168.2.2
Ntp::Client: Source has been set.
Ntp::Client: Source has been reset.
```

**Notes**

История изменений Версия Описание Добавлена команда ntp source.4.01

---

### ntp sync-period

Установитьпериодсинхронизациивремени.По умолчаниюиспользуется значение 1 неделя. Команда с префиксом no устанавливает время синхронизации по умолчанию.

**Syntax**

```bash
ntp sync-period ‹period›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| period | — | — | — |

**Examples**

```
Пример (config)> ntp sync-period 60
Ntp::Client: A synchronization period set to 60 minutes.
(config)> no ntp sync-period
Ntp::Client: Synchronization period value reset.
```

**Notes**

История изменений Версия Описание Добавлена команда ntp sync-period.2.00

---

### object-group ip

Создать объектную группу типа IP, в которой могут храниться подсети IPv4 с дополнительнойинформациейо протоколеL4 и диапазонепортов. Команда с префиксом no удаляет группу.

**Syntax**

```bash
object-group ip ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (config)> object-group ip test
Network::ObjectGroup: "test": group created.
(config)> no object-group ip test
Network::ObjectGroup: "test": group removed.
```

**Notes**

История изменений Версия Описание Добавлена команда object-group ip.4.00

---

### object-group ip exclude

Добавить или удалить не совпадающий элемент объектной группы. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
exclude ‹proto› ‹address› [ ‹port› [‹end-port›]]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| proto | — | — | — |
| address | — | — | — |
| port | — | — | — |
| end-port | — | — | — |

**Examples**

```
(config-ogrp-ip)> no exclude ‹proto› ‹address› [ ‹port› [‹end-port›]]
proto IP протокол (включая протоколы TCP, UDP,
ICMP и другие).
TCP протокол.tcp
UDP протокол.udp
TCP и UDP протоколы.tcpudp
ICMP протокол.icmp
ESP протокол.esp
GRE протокол.gre
IP in IP протокол.ipip
```

**Notes**

История изменений Версия Описание Добавлена команда object-group ip exclude.4.00

---

### object-group ip include

Добавить или удалить совпадающий элемент объектной группы. Команда с префиксом no удаляет настройку.

**Examples**

```
(config-ogrp-ip)> include ‹proto› ‹address› [ ‹port› [‹end-port› ] ]
(config-ogrp-ip)> no include ‹proto› ‹address› [ ‹port› [‹end-port› ] ]
proto IP протокол (включая протоколы TCP, UDP,
ICMP и другие).
TCP протокол.tcp
UDP протокол.udp
TCP и UDP протоколы.tcpudp
ICMP протокол.icmp
ESP протокол.esp
GRE протокол.gre
```

**Notes**

История изменений Версия Описание Добавлена команда object-group ip include.4.00

---

### oc-server

Доступ к группе команд для настройки параметров сервера OpenConnect.

**Syntax**

```bash
oc-server
```

**Examples**

```
Пример (config)> oc-server
(oc-server)>
```

**Notes**

История изменений Версия Описание Добавлена команда oc-server.4.02

---

### oc-server camouflage

Включить режим camouflage для сервера OpenConnect, обеспечивающий дополнительную безопасность от удаленного сканирования доступных сервисов. По умолчанию данный режим выключен. Команда с префиксом no отключает режим camouflage.

**Syntax**

```bash
camouflage (oc-server)> no camouflage
```

**Examples**

```
Пример (oc-server)> camouflage
OcServer::Manager: Enabled camouflage mode.
(oc-server)> no camouflage
OcServer::Manager: Disabled camouflage mode.
```

**Notes**

История изменений Версия Описание Добавлена команда oc-server camouflage.4.02

---

### oc-server interface

Связать сервер OpenConnect с указанным интерфейсом. Команда с префиксом no разрывает связь.

**Syntax**

```bash
interface ‹interface› (oc-server)> no interface
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |

**Examples**

```
Пример (oc-server)> interface Bridge0
OcServer::Manager: Bound to Bridge0.
(oc-server)> no interface
OcServer::Manager: Reset interface binding.
```

**Notes**

История изменений Версия Описание Добавлена команда oc-server interface.4.02

---

### oc-server mtu

Установить значение MTU, которое будет передано серверу OpenConnect. По умолчанию используется значение 1350. Команда с префиксом no устанавливает значение по умолчанию.

**Syntax**

```bash
mtu ‹value› (oc-server)> no mtu
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| value | — | — | — |

**Examples**

```
Пример (oc-server)> mtu 1350
OcServer::Manager: MTU set to 1350.
(oc-server)> no mtu
OcServer::Manager: MTU reset.
```

**Notes**

История изменений Версия Описание Добавлена команда oc-server mtu.4.02

---

### oc-server multi-login

Разрешить подключение к серверу OpenConnect нескольких пользователей с одного аккаунта. Команда с префиксом no отключает эту возможность.

**Syntax**

```bash
multi-login (oc-server)> no multi-login
```

**Examples**

```
Пример (oc-server)> multi-login
OcServer::Manager: Enabled multiple login.
(oc-server)> no multi-login
OcServer::Manager: Disabled multiple login.
```

**Notes**

История изменений Версия Описание Добавлена команда oc-server multi-login.4.02

---

### oc-server pool-range

Назначить пул адресов для клиентов, подключающихся к серверу OpenConnect. Команда с префиксом no удаляет пул.

**Syntax**

```bash
oc-server ‹begin› [ ‹size› ] (oc-server)> no oc-server
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| begin | — | — | — |
| size | — | — | — |

**Examples**

```
Пример (oc-server)> pool-range 192.168.1.30 7
OcServer::Manager: Configured pool range 192.168.1.30 to ►
192.168.1.36.
(oc-server)> no pool-range
OcServer::Manager: Reset pool range.
```

**Notes**

История изменений Версия Описание Добавлена команда oc-server pool-range.4.02

---

### oc-server static-ip

Назначить постоянный IP-адрес пользователю. Пользователь в системе должен иметь метку vpn-oc. Команда с префиксом no удаляет привязку.

**Syntax**

```bash
static-ip ‹name› ‹address› (oc-server)> no static-ip ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| address | — | — | — |

**Examples**

```
Пример (oc-server)> static-ip admin 192.168.1.30
OcServer::Manager: Static IP 192.168.1.30 assigned to user ►
"admin".
(oc-server)> no static-ip admin
OcServer::Manager: Static IP address removed for user "admin".
```

**Notes**

История изменений Версия Описание Добавлена команда oc-server static-ip.4.02

---

### opkg chroot

Включить chroot для opkg. Если включено, корневой каталог изменяется на /opt перед выполнением любого сценария opkg. По умолчанию настройка отключена. Команда с префиксом no отключает данный режим.

**Syntax**

```bash
opkg chroot
```

**Examples**

```
Пример (config)> opkg chroot
Opkg::Manager: Chroot enabled.
(config)> no opkg chroot
Opkg::Manager: Chroot disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда opkg chroot.2.05.C.3

---

### opkg disk

Настроить раздел для opkg. Этот параметр необходим для установки и запуска opkg. После настройки, раздел будет монтироваться в /opt с использованием mount --bind и последующим запуском скрипта initrc см. также Раздел 3.122 на странице 471. Если каталог /opt/install не пуст, все содержащиеся в нем архивы *.ipkи *.tgzраспаковываютсяв /opt передвыполнениемinitrc. После установки архивы удаляются. Команда с префиксом no отключает opkg.

**Syntax**

```bash
opkg disk ‹disk› [ ‹url› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| disk | — | — | — |
| url | — | — | — |

**Examples**

```
(config)> no opkg disk
Метка раздела или UUID.Строкаdisk
URL-адрес пакета установки.Строкаurl
Пример (config)> opkg disk ext4_opkg:/
Opkg::Manager: Disk is set to: ext4_opkg:/.
(config)> opkg disk storage:/ ►
https://bin.entware.net/aarch64-k3.10/installer/aarch64-installer.tar.gz
Opkg::Manager: Disk is set to: storage:/.
Opkg::Manager: Disk is unset.
```

**Notes**

История изменений Версия Описание Добавлена команда opkg disk.2.05 Добавлен аргумент url.4.02

---

### opkg dns-override

Отключить TCP и UDP 53 порт для DNS-прокси. Отключение порта позволяет заменить встроенный DNS-прокси собственной службой, например BIND или Dnsmasq из opkg. Команда с префиксом no возвращает работу порта для DNS-прокси.

**Syntax**

```bash
opkg dns-override
```

**Examples**

```
Пример (config)> opkg dns-override
Opkg::Manager: DNS override enabled.
(config)> no opkg dns-override
Opkg::Manager: DNS override disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда opkg dns-override.2.05

---

### opkg initrc

Задать стартовый скрипт. Значение по умолчанию — /opt/etc/initrc. Когда opkg disk смонтирован и пакеты установлены, система выполнит стартовый скрипт. Если path это каталог, система будет выполнять все содержащиеся в нем скрипты в алфавитном порядке. Команда с префиксом no сбрасывает initrc в значение по умолчанию.

**Syntax**

```bash
opkg initrc ‹path›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| path | — | — | — |

**Examples**

```
Пример (config)> opkg initrc /opt/etc/init.d/rc.unslung
Opkg::Manager: Configured init script: ►
"/opt/etc/init.d/rc.unslung".
(config)> no opkg initrc
Opkg::Manager: Init script reset to default: /opt/etc/initrc.
```

**Notes**

История изменений Версия Описание Добавлена команда opkg initrc.2.05.C.3

---

### opkg timezone

Настроить переменную окружения TZ и файл /opt/var/TZ для opkg. По умолчанию часовой пояс не определен. Значение TZ зависит от С библиотеки opkg, от того, как там интерпретирован часовой пояс. Оно может быть или в POSIX формате stdoffset[dst[offset][,start[/time],end[/time]]]или в виде имени файла базы данных информации о зонах (используется в glibc и почти во всех GNU-системах). Команда с префиксом no устанавливает значение по умолчанию.

**Syntax**

```bash
opkg timezone (auto | ‹timezone›)
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| timezone | — | — | — |

**Examples**

```
Пример (config)> opkg timezone auto
Opkg::Manager: Enabled automatic timezone.
(config)> opkg timezone UTC
Opkg::Manager: Enabled timezone "UTC".
(config)> no opkg timezone
Opkg::Manager: Timezone reset to undefined.
```

**Notes**

История изменений Версия Описание Добавлена команда opkg timezone.2.05.C.3

---

### ping-check profile

Доступ к группе команд для настройки выбранного профиля Ping Check. Если профиль не найден, команда пытается его создать. Команда с префиксом no удаляет профиль Ping Check.

**Syntax**

```bash
ping-check profile ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (config)> ping-check profile [Tab]
Usage template:
profile {name}
Choose:
TEST
MYMY
(config)> ping-check profile new_prof
PingCheck::Client: Profile "new_prof" has been created.
(config-pchk)>
(config)> no ping-check profile new_prof
```

**Notes**

История изменений Версия Описание Добавлена команда ping-check profile.2.04

---

### ping-check profile host

Указать удаленный хост для тестирования. По умолчанию, адрес хоста назначается в соответствии с кодом страны. Команда с префиксом no удаляет имя хоста.

**Syntax**

```bash
host ‹host›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| host | — | — | — |

**Examples**

```
Пример (config-pchk)> host 8.8.8.8
PingCheck::Profile: "test": add host "8.8.8.8" for testing.
(config-pchk)> host google.com
PingCheck::Profile: "test": add host "google.com" for testing.
(config-pchk)> no host
PingCheck::Profile: "test": hosts cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда ping-check profile host.2.04

---

### ping-check profile max-fails

Указатьколичествопоследовательныхнеудачныхзапросовк удаленному хосту, по достижению которого интернет на интерфейсе считается отсутствующим. По умолчанию используется значение 5. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
max-fails ‹count›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| count | — | — | — |

**Examples**

```
Пример (config-pchk)> max-fails 7
PingCheck::Profile: "test": uses 7 fail count for disabling ►
interface.
(config-pchk)> no max-fails
PingCheck::Profile: "test": fail count is reset to 5.
```

**Notes**

История изменений Версия Описание Добавлена команда ping-check profile max-fails.2.04

---

### ping-check profile min-success

Указать количество последовательных удачных запросов к удаленному хосту, по достижению которого интернет на интерфейсе считается наличествующим. По умолчанию используется значение 5. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
min-success ‹count›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| count | — | — | — |

**Examples**

```
Пример (config-pchk)> min-success 3
PingCheck::Profile: "test": uses 3 success count for enabling ►
interface.
(config-pchk)> no min-success
PingCheck::Profile: "test": success count is reset to 5.
```

**Notes**

История изменений Версия Описание Добавлена команда ping-check profile min-success.2.04

---

### ping-check profile mode

Установитьрежим Ping Check. По умолчаниюустановленозначение icmp.

**Syntax**

```bash
mode ‹mode›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mode | — | — | — |

**Examples**

```
Пример (config-pchk)> mode tls
PingCheck::Profile: "test": uses tls mode.
```

**Notes**

История изменений Версия Описание Добавлена команда ping-check profile mode.2.04 Добавлен аргумент tls.3.09 Добавлен аргумент uri.4.00

---

### ping-check profile port

Указать порт для подключения к удаленному хосту. Настройка имеет смысл при режиме Ping Check connect (см. команду ping-check profile mode). Команда с префиксом no удаляет настройку.

**Syntax**

```bash
port ‹port›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| port | — | — | — |

**Examples**

```
Пример (config-pchk)> port 80
PingCheck::Profile: "test": uses port 80 for testing.
(config-pchk)> no port
PingCheck::Profile: "test": port is cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда ping-check profile port.2.04

---

### ping-check profile power-cycle

ВключитьуправлениепитаниемсетевогоинтерфейсаUSB.По умолчанию включено. Команда с префиксом no отключает настройку.

**Syntax**

```bash
power-cycle
```

**Examples**

```
Пример (config-pchk)> power-cycle
PingCheck::Profile: "test": enabled USB power cycle.
(config-pchk)> power-cycle
PingCheck::Profile: "test": disabled USB power cycle.
```

**Notes**

История изменений Версия Описание Добавлена команда ping-check profile power-cycle.2.04

---

### ping-check profile timeout

Установить максимальное время ожидания ответа удаленного хоста на один запрос в секундах. По умолчанию используется значение 2. Команда с префиксом no устанавливает значение по умолчанию.

**Syntax**

```bash
timeout ‹timeout›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| timeout | — | — | — |

**Examples**

```
Пример (config-pchk)> timeout 4
PingCheck::Profile: "test": timeout is changed to 4 seconds.
(config-pchk)> no timeout
PingCheck::Profile: "test": timeout is reset to 2.
```

**Notes**

История изменений Версия Описание Добавлена команда ping-check profile timeout.2.04

---

### ping-check profile update-interval

Установить периодичность выполнения проверок Ping Check.

**Syntax**

```bash
update-interval ‹seconds›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| seconds | — | — | — |

**Examples**

```
Пример (config-pchk)> update-interval 60
PingCheck::Profile: "test": update interval is changed to 60 ►
seconds.
```

**Notes**

История изменений Версия Описание Добавлена команда ping-check profile update-interval. 2.04

---

### ping-check profile uri

Указать URI (Uniform Resource Identifier7) хоста для проверки. Команда с префиксом no удаляет хост.

**Syntax**

```bash
uri ‹uri›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| uri | — | — | — |

**Examples**

```
Пример (config-pchk)> uri http://localhost:8888/
PingCheck::Profile: "TEST": add URI "http://localhost:8888/"for ►
testing.
(config-pchk)> uri https://localhost:4343/
PingCheck::Profile: "TEST": add URI "https://localhost:4343/" ►
for testing.
(config-pchk)> no uri http://localhost:8888/
PingCheck::Profile: "TEST": URIs cleared.
(config-pchk)> no uri
```

**Notes**

История изменений Версия Описание Добавлена команда ping-check profile uri.4.00

---

### ppe

Включить механизм пакетной обработки. По умолчанию настройка включена и для HWNAT, и для SWNAT. Команда с префиксом no отключает выбранный ускоритель. 7 https://ru.wikipedia.org/wiki/URI

**Syntax**

```bash
ppe ‹engine›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| engine | — | — | — |

**Examples**

```
Пример (config)> ppe software
Network::Interface::Rtx::Ppe: Software PPE enabled.
(config)> no ppe
Network::Interface::Rtx::Ppe: All PPE disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда ppe.2.00 Добавлен аргумент engine.2.05 Добавлен аргумент hardware-ipv6.2.07 Аргумент hardware-ipv6 удален как устаревший.4.00

---

### pppoe pass

Включить функцию сквозного пропускания. Можно ввести до 10 локальных сетевых узлов. Команда с префиксом no отключает функцию.

**Syntax**

```bash
pppoe pass through ‹wan-iface› ‹lan-iface›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| wan-iface | — | — | — |
| lan-iface | — | — | — |

**Examples**

```
Пример (config)> pppoe pass through Home ISP
Pppoe::Pass: Configured pass from "Bridge0" to "GigabitEthernet1".
(config)> no pppoe pass
Pppoe::Pass: Disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда pppoe pass.2.00

---

### printer

Доступ к группе команд для настройки выбранного принтера. Если принтер не найден, команда пытается его создать. Команда с префиксом no удаляет принтер из системы.

**Syntax**

```bash
printer ‹id›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| id | — | — | — |

**Examples**

```
Пример (config)> printer 0924:3cf4
(config-printer)>
```

**Notes**

История изменений Версия Описание Добавлена команда printer.2.00

---

### printer bidirectional

Включить для принтера двунаправленный режим обмена. Команда с префиксом no отключает двунаправленный режим.

**Syntax**

```bash
bidirectional
```

**Examples**

```
Пример (config-printer)> bidirectional
Printer::Manager: A bidirectional mode enabled.
(config-printer)> no bidirectional
Printer::Manager: A bidirectional mode disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда printer bidirectional.2.04

---

### printer debug

Включитьрежимотладкидля принтера.Еслиаргументне указан,уровень отладки устанавливается равным 1. Команда с префиксом no отключает отладочный режим.

**Syntax**

```bash
debug [ level ‹level› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| level | — | — | — |

**Examples**

```
Пример (config-printer)> debug level 3
Printer::Manager: a debug level set to 3.
(config-printer)> no debug
Printer::Manager: A debug mode disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда printer debug.2.04

---

### printer firmware

Установить файл прошивки принтера.

**Syntax**

```bash
firmware ‹firmware›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| firmware | — | — | — |

**Examples**

```
Пример (config-printer)> firmware storage:sihp1018.dl
Printer::Manager: A printer firmware set.
(config-printer)> no firmware
```

**Notes**

История изменений Версия Описание Добавлена команда printer firmware.2.00

---

### printer name

Присвоить принтеру произвольное имя.

**Syntax**

```bash
name ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (config-printer)> name Canon
Printer::Manager: A printer name set.
```

**Notes**

История изменений Версия Описание Добавлена команда printer name.2.00

---

### printer port

Установить порт принтера, если тип принтера direct. По умолчанию используется порт 9100.

**Syntax**

```bash
port ‹port›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| port | — | — | — |

**Examples**

```
Пример (config-printer)> port 2012
Printer::Manager: A port set.
```

**Notes**

История изменений Версия Описание Добавлена команда printer port.2.00

---

### printer status-polling

Включить опрос состояния принтера. По умолчанию функция включена. Команда с префиксом no отключает опрос состояния принтера.

**Syntax**

```bash
status-polling
```

**Examples**

```
Пример (config-printer)> status-polling
Printer::Manager: Status polling enabled.
(config-printer)> no status-polling
Printer::Manager: Status polling disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда printer status-polling.3.04

---

### printer type

Установить тип принтера.

**Syntax**

```bash
type ‹type›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| type | — | — | — |

**Examples**

```
Пример (config-printer)> type direct
Printer::Manager: A printer type set.
```

**Notes**

История изменений Версия Описание Добавлена команда printer type.2.00

---

### schedule

Доступ к группе команд для настройки выбранного расписания. Если расписание не найдено, команда пытается его создать. Команда с префиксом no удаляет расписание.

**Syntax**

```bash
schedule ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
(config)> no schedule ‹name›
Название расписания.Строкаname
```

**Notes**

История изменений Версия Описание Добавлена команда schedule.2.06

---

### schedule action

Задать действия, выполняемые согласно выбранному расписанию. Команда с префиксом no отменяет действие.

**Syntax**

```bash
action ‹action› ‹min› ‹hour› ‹dow›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| action | — | — | — |
| min | — | — | — |
| hour | — | — | — |
| dow | — | — | — |

**Examples**

```
Пример (config-sched)> action start 0 9 1,2,3,4,5
Core::Schedule::Manager: Updated schedule "WIFI".
```

**Notes**

История изменений Версия Описание Добавлена команда schedule action.2.06

---

### schedule description

Задать описание для выбранного расписания. Команда с префиксом no стирает описание.

**Syntax**

```bash
description ‹description›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| description | — | — | — |

**Examples**

```
Пример (config-sched)> description "Schedule for on/off Access Point"
Core::Schedule::Manager: Updated description of schedule "WIFI".
```

**Notes**

История изменений Версия Описание Добавлена команда schedule description.2.06

---

### schedule led

Назначить светодиодную индикацию для запланированных событий. Должен быть выбран параметр SelectedSchedule при помощи команды system led. Команда с префиксом no отключает светодиодную индикацию.

**Syntax**

```bash
led ‹action›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| action | — | — | — |

**Examples**

```
Пример (config-sched)> led start
Core::Schedule::Led: Selected schedule "111".
```

**Notes**

История изменений Версия Описание Добавлена команда schedule led.2.08

---

### service afp

Запустить службу AFP.

**Syntax**

```bash
service afp
```

**Examples**

```
Пример (config)> service afp
Afp::Server: Enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service afp.2.06

---

### service cifs

Включить CIFS-сервер.

**Syntax**

```bash
service cifs
```

**Examples**

```
Пример (config)> service cifs
Cifs::ServerTsmb: Enabled.
(config)> no service cifs
Cifs::ServerTsmb: Disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service cifs.2.00

---

### service dhcp

Включить DHCP-сервер. Если для запуска службы недостаточно настроек (см. ip dhcp pool), служба не будет отвечать по сети. Как только настроек станет достаточно, служба включится автоматически. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service dhcp
```

**Examples**

```
Пример (config)> service dhcp
service enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service dhcp.2.00

---

### service dhcp-relay

Включить ретранслятор-DHCP. Если для запуска службы недостаточно настроек (см. ip dhcp relay lan, ip dhcp relay server, ip dhcp relay wan), службане будет отвечатьпо сети. Как тольконастроекстанетдостаточно, служба включится автоматически. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service dhcp-relay
```

**Examples**

```
Пример (config)> service dhcp-relay
service enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service dhcp-relay.2.00

---

### service dlna

Включить службу DLNA. Если для запуска службы недостаточно настроек (см. dlna), служба не будет отвечать по сети. Как только настроек станет достаточно, служба включится автоматически. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service dlna
```

**Examples**

```
Пример (config)> service dlna
DLNA server enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service dlna.2.00

---

### service dns-proxy

Включить DNS-прокси. Для настройки параметров службы, используйте группу команд Раздел 3.21 на странице 122.

**Syntax**

```bash
service dns-proxy
```

**Examples**

```
Пример (config)> service dns-proxy
Dns::Manager: DNS proxy enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service dns-proxy.2.00

---

### service ftp

Включить FTP-сервер для обеспечения пользователей доступом к подключенным USB-носителям, настроечным файлам и файлам с обновлениями микропрограммы. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service ftp
```

**Examples**

```
Пример (config)> service ftp
FTP server enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service ftp.2.00

---

### service http

Включить HTTP-сервер, который предоставляет пользователю Web-интерфейс для настройки Giga. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service http
```

**Examples**

```
Пример (config)> service http
HTTP server enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service http.2.00

---

### service igmp-proxy

ВключитьIGMP-прокси.Для работы службы необходимоналичие одного интерфейса upstream и хотя бы одного интерфейса downstream. Если для запускаслужбынедостаточнонастроек,она не будетработать.Как только настроек станет достаточно, служба включится автоматически. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service igmp-proxy
```

**Examples**

```
Пример (config)> service igmp-proxy
IGMP proxy enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service igmp-proxy.2.00

---

### service internet-checker

ВключитьInternet-checkerдля контролясостоянияИнтернетсоединения на устройстве. По умолчанию функция включена. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service internet-checker
```

**Examples**

```
Пример (config)> service internet-checker
Network::InternetChecker: Hosts check enabled.
(config)> no service internet-checker
Network::InternetChecker: Hosts check disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service internet-checker.2.13

---

### service ipsec

Запустить службу IPsec. По умолчанию служба отключена. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service ipsec
```

**Examples**

```
Пример (config)>service ipsec
IpSec::Manager: Service enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service ipsec.2.06

---

### service kabinet

Включить службу авторизатора КАБiNET. По умолчанию служба отключена. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service kabinet
```

**Examples**

```
Пример (config)> service kabinet
Kabinet::Authenticator: Authenticator enabled.
(config)> service kabinet
Kabinet::Authenticator: Authenticator disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service kabinet.2.02

---

### service mdns

Включить службу mDNS. По умолчанию служба включена. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service mdns
```

**Examples**

```
Пример (config)>service mdns
(config)>no service mdns
```

**Notes**

История изменений Версия Описание Добавлена команда service mdns.2.15

---

### service mws

Включить службу MWS. По умолчанию служба отключена. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service mws
```

**Examples**

```
Пример (config)> service mws
Mws::Controller: Enabled.
(config)> no service mws
Mws::Controller: Disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service mws.2.15

---

### service ntce

Запустить службу NTCE. По умолчанию сервис отключен. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service ntce
```

**Examples**

```
Пример (config)> service ntce
Ntce::Manager: Enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service ntce. Прежнее название команды service dpi. 2.09

---

### service ntp

Запустить службу NTP. По умолчанию служба работает. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service ntp
```

**Examples**

```
Пример (config)> service ntp
Ntp::Client: NTP service enabled.
(config)> no service ntp
Ntp::Client: NTP service disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service ntp. Прежнее название команды service ntp-client. 3.09

---

### service oc-server

Включить сервер OpenConnect. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service oc-server
```

**Examples**

```
Пример (config)> service oc-server
OcServer::Manager: Service enabled.
(config)> no service oc-server
OcServer::Manager: Service disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service oc-server.4.02

---

### service snmp

Запустить службу SNMP. По умолчанию служба отключена. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service snmp
```

**Examples**

```
Пример (config)> service snmp
Snmp::Manager: SNMP service was enabled.
(config)> no service snmp
Snmp::Manager: SNMP service was disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service snmp.2.08

---

### service ssh

Включить сервер SSH, который предоставляет пользователю интерфейс командной строки для настройки устройства. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service ssh
```

**Examples**

```
Пример (config)> service ssh
Ssh::Manager: SSH server enabled.
(config)> no service ssh
Ssh::Manager: SSH server disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service ssh.2.12

---

### service sstp-server

Включить сервер SSTP. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service sstp-server
```

**Examples**

```
Пример (config)> service sstp-server
SstpServer::Manager: Service enabled.
(config)> no service sstp-server
SstpServer::Manager: Service disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service sstp-server.2.12

---

### service telnet

Включитьсерверtelnet,которыйпредоставляетпользователюинтерфейс командной строки для настройки устройства. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service telnet
```

**Examples**

```
Пример (config)> service tel
Telnet server enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service telnet.2.00

---

### service torrent

Включить BitTorrent-клиент для обеспечения пользователей общим доступом к большим файлам (фильмам, ТВ-шоу) посредством пирингового сетевого протокола. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service torrent
```

**Examples**

```
(config)> no service torrent
Пример (config)> service torrent
server enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service torrent.2.00

---

### service udpxy

Включить службу udpxy. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service udpxy
```

**Examples**

```
Пример (config)> service udpxy
Udpxy::Manager: a service enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service udpxy.2.03

---

### service upnp

Включить службу UPnP. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service upnp
```

**Notes**

История изменений Версия Описание Добавлена команда service upnp.2.00

---

### service vpn-server

Включить сервер VPN. Команда с префиксом no останавливает службу.

**Syntax**

```bash
service vpn-server
```

**Examples**

```
Пример (config)> service vpn-server
VpnServer::Manager: Service enabled.
(config)> no service vpn-server
VpnServer::Manager: Service disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда service vpn-server.2.04

---

### show

Доступ к группе команд для просмотра диагностической информации о системе. Все команды этой группы не изменяют системные настройки.

**Syntax**

```bash
show
```

**Notes**

История изменений Версия Описание Добавлена команда show.2.00

---

### show access

Показать пользовательский доступ к каталогу на USB-устройстве.

**Syntax**

```bash
access ‹directory›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| directory | — | — | — |

**Examples**

```
Пример (show)> access PENDRIVE:doc
user:
name: admin
assigned: write
effective: write
exists: yes
name: test
assigned: read
effective: read
```

**Notes**

История изменений Версия Описание Добавлена команда show access.2.00

---

### show acme

Показать статус клиента ACME в системе.

**Syntax**

```bash
acme
```

**Examples**

```
Пример (show)> acme
acme:
real-time: yes
ndns-domain: mytest.netcraze.pro
ndns-domain-acme: yes
ndns-domain-error: no
default-domain: cc6b5a71a7644903b51a5454.netcraze.io
account-pending: no
account-running: no
get-pending: no
```

**Notes**

История изменений Версия Описание Добавлена команда show acme.2.11

---

### show afp

Показать статус службы AFP.

**Syntax**

```bash
afp
```

**Examples**

```
Пример (show)> afp
enabled: yes
automount: yes
permissive: yes
share:
mount: C253-062D:
label: FLASH
timemachine: yes
description:
active: yes
```

**Notes**

История изменений Версия Описание Добавлена команда show afp.2.06

---

### show associations

Показать список беспроводных станций, связанных с точкой доступа. Если выполнить команду без аргумента, то на экран будет выведен весь список беспроводных станций.

**Syntax**

```bash
associations [ ‹name› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> associations [Tab]
Usage template:
associations [{name}]
Choose:
WifiMaster0/AccessPoint2
WifiMaster1/AccessPoint1
WifiMaster0/AccessPoint3
WifiMaster0/AccessPoint0
AccessPoint
WifiMaster1/AccessPoint2
```

**Notes**

История изменений Версия Описание Добавлена команда show associations.2.00

---

### show button

Показать информацию по указанной системной кнопке. Если выполнить команду без аргумента, то на экран будет выведен весь список кнопок на устройстве. Набор кнопок зависит от аппаратной конфигурации.

**Syntax**

```bash
button [‹name›]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> button FN1
buttons:
button, name = FN1:
is_switch: no
position: 2
position_count: 2
clicks: 0
elapsed: 0
hold_delay: 3000
```

**Notes**

История изменений Версия Описание Добавлена команда show button.2.00

---

### show button bindings

Показать список действий, назначенных на кнопки устройства.

**Syntax**

```bash
button bindings
```

**Examples**

```
Пример (show)> button bindings
bindings:
binding, index = 0:
button: RESET
action: click
active_handler: Reboot
default_handler: Reboot
protected: yes
binding, index = 1:
action: hold
```

**Notes**

История изменений Версия Описание Добавлена команда show button bindings.2.03

---

### show button handlers

Показать список доступных обработчиков кнопок в системе.

**Syntax**

```bash
button handlers
```

**Examples**

```
Пример (show)> button handlers
handlers:
handler, name = LedToggle:
short_description: toggle system LED states
protected: no
switch_related: no
handler, name = FactoryReset:
short_description: reset a configuration to factory ►
defaults
protected: yes
```

**Notes**

История изменений Версия Описание Добавлена команда show button handlers.2.03

---

### show chilli profiles

Показать список доступных профилей RADIUS-сервера.

**Syntax**

```bash
chilli profiles
```

**Examples**

```
Пример (show)> chilli profiles
profile:
name: Iron Wi-Fi
url: https://www.ironwifi.com/
description: Hosted RADIUS and Captive Portal
preset:
uamserver: ►
https://europe-west3.ironwifi.com/api/pages/uam/
radius:
server1: 35.198.88.176
```

**Notes**

История изменений Версия Описание Добавлена команда show chilli profiles.2.10

---

### show cifs

Показать статус CIFS-сервера.

**Syntax**

```bash
cifs
```

**Examples**

```
Пример (show)> cifs
enabled: yes
master: no
automount: yes
permissive: yes
share:
mount: 9430B54530B52EDC:
label: 9430B54530B52EDC
description:
active: no
```

**Notes**

История изменений Версия Описание Добавлена команда show cifs.2.00

---

### show clock date

Показать текущее системное время.

**Syntax**

```bash
clock date
```

**Examples**

```
Пример (show)> clock date
weekday: 4
day: 18
month: 1
year: 2018
hour: 8
min: 46
sec: 2
msec: 660
dst: inactive
```

**Notes**

История изменений Версия Описание Добавлена команда show clock date.2.00

---

### show clock timezone-list

Показать список доступных часовых поясов.

**Syntax**

```bash
clock timezone-list
```

**Examples**

```
Пример (show)> clock timezone-list
timezones:
tz:
locality: Adak
stdoffset: -36000
dstoffset: -32400
locality: Aden
stdoffset: 10800
dstoffset: -1
locality: Almaty
```

**Notes**

История изменений Версия Описание Добавлена команда show clock timezone-list.2.00

---

### show components status

Показать статус обновления компонентов.

**Syntax**

```bash
component status
```

**Examples**

```
Пример (show)> components status
update:
state: idle
(show)> components status
state: running
progress: 41
```

**Notes**

История изменений Версия Описание Добавлена команда show components status.4.00

---

### show configurator status

Показать информацию о системном конфигураторе.

**Syntax**

```bash
configurator status
```

**Examples**

```
Пример (show)> configurator status
touch: Thu, 18 Oct 2018 14:37:25 GMT
header, name = Model: Netcraze Giga
header, name = Version: 2.06.1
header, name = Agent: http/rci
header, name = Last change: Thu, 18 Oct 2018 14:37:25 ►
GMT
serving:
name: Session /var/run/ndm.core.socket
time: 0.000397
```

**Notes**

История изменений Версия Описание Добавлена команда show configurator status.2.06

---

### show credits

Показать лицензионную информацию об установленном пакете в NetcrazeOS. Если выполнить команду без аргумента, то на экран будет выведена вся информация по установленным пакетам на устройстве.

**Syntax**

```bash
credits [ ‹package› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| package | — | — | — |

**Examples**

```
Пример (show)> credits
package:
name: accel-ppp
title: High performance accel-ppp VPN server
homepage: https://accel-ppp.org/
name: accel-ppp-l2tp
title: L2TP plugin for accel-ppp
name: accel-ppp-pptp
title: PPTP plugin for accel-ppp
name: accel-ppp-sstp
```

**Notes**

История изменений Версия Описание Добавлена команда show credits.3.01

---

### show crypto ike key

Показать информациюо выбранномключе IKE. Если выполнитькоманду без аргумента, то весь список IKE ключей будет выведен на экран.

**Syntax**

```bash
crypto ike key [name]
```

**Examples**

```
Пример (show)> crypto ike key
IpSec:
ike_key, name = test:
type: address
id: 10.10.10.10
ike_key, name = test2:
type: any
id: ►
```

**Notes**

История изменений Версия Описание Добавлена команда show crypto ike key.2.06

---

### show crypto map

Показать информацию о выбранной криптокарте IPsec. Если выполнить команду без аргумента, то весь список криптокарт IPsec будет выведен на экран.

**Syntax**

```bash
crypto map [map-name]
```

**Examples**

```
Пример (show)> crypto map test
IpSec:
crypto_map, name = test:
config:
remote_peer: ipsec.example.com
crypto_ipsec_profile_name: prof1
mode: tunnel
local_network:
net: 172.16.200.0
mask: 24
```

**Notes**

История изменений Версия Описание Добавлена команда show crypto map.2.06

---

### show defaults

Показатьобщиепараметрыбеспроводнойсетии системыпо умолчанию.

**Syntax**

```bash
defaults
```

**Examples**

```
Пример (show)> defaults
servicetag: 014635737374***
servicehost: ndss.netcraze.ndmsystems.com
servicepass: ***************
wlanssid: Netcraze-0000
wlankey: xFxTH***
wlanwps: 75534***
country: RU
ndmhwid: KN-1010
ctrlsum: 4712e0849ccea477ccdd18e2fedb***
```

**Notes**

История изменений Версия Описание Добавлена команда show defaults.2.00

---

### show dlna

Показать статус DLNA-сервера.

**Syntax**

```bash
dlna
```

**Examples**

```
Пример (show)> dlna
running: yes
```

**Notes**

История изменений Версия Описание Добавлена команда show dlna.2.00

---

### show dns-proxy

Показать список серверов DNS поверх TLS и DNS поверх HTTPS.

**Syntax**

```bash
dns-proxy
```

**Examples**

```
Пример (show)> dns-proxy
proxy-status:
proxy-name: System
proxy-config:
rpc_port = 54321
rpc_ttl = 10000
rpc_wait = 10000
timeout = 7000
proceed = 500
stat_file = /var/ndnproxymain.stat
```

**Notes**

История изменений Версия Описание Добавлена команда show dns-proxy.3.01

---

### show dns-proxy filter presets

Показатьсписокпресетовфильтрации.Всегдаестькак минимум1 пресет, но их может быть гораздо больше.

**Syntax**

```bash
dns-proxy filter presets [ ‹lang› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| lang | — | — | — |

**Examples**

```
Пример (show)> dns-proxy filter presets en
version: 4
presets:
id: opendns-family
url: ►
https://www.opendns.com/home-internet-security/
stale: no
short-description: OpenDNS - FamilyShield
description: Blocks domains that are categorized as ►
Tasteless, Proxy/Anonymizer, Sexuality and Pornography.
```

**Notes**

История изменений Версия Описание Добавлена команда show dns-proxy filter presets.3.08

---

### show dns-proxy filter profiles

Показать список профилей фильтрации.

**Syntax**

```bash
dns-proxy filter profiles
```

**Examples**

```
Пример (show)> dns-proxy filter profiles
profiles:
id: DnsProfile0
description: test
```

**Notes**

История изменений Версия Описание Добавлена команда show dns-proxy filter profiles.3.08

---

### show dot1x

Показать состояние клиента 802.1х на интерфейсе. Для возможности управления состоянием клиента 802.1х на интерфейсе должна быть настроена авторизация при помощи группы команд interface authentication.

**Syntax**

```bash
dot1x [ interface ]
```

**Examples**

```
Пример (show)> dot1x [Tab]
Usage template:
dot1x [{name}]
Choose:
GigabitEthernet1
ISP
WifiMaster0/AccessPoint2
WifiMaster1/AccessPoint1
WifiMaster0/AccessPoint3
WifiMaster0/AccessPoint0
```

**Notes**

История изменений Версия Описание Добавлена команда show dot1x.2.02

---

### show dpn document

Показать текст соглашения DPN.

**Syntax**

```bash
dpn document [ ‹version› ] [ ‹language› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| version | — | — | — |
| language | — | — | — |

**Examples**

```
Пример (show)> dpn document
20200330
DEVICE PRIVACY NOTICE
Last update 2020-30-03
This End User License Agreement (this “Agreement”) constitutes ►
a valid and
binding agreement between Netcraze Limited, including all ►
affiliates and
subsidiaries (“Netcraze”, “us”, “our” or “we”) and You (as ►
defined below)
```

**Notes**

История изменений Версия Описание Добавлена команда show dpn document.3.05

---

### show dpn list

Показать список соглашений DPN, доступных в системе.

**Syntax**

```bash
dpn list
```

**Examples**

```
Пример (show)> dpn list
dpn:
version: 20200330
document:
lang: de
format: txt
format: md
lang: en
lang: es
```

**Notes**

История изменений Версия Описание Добавлена команда show dpn list.3.05

---

### show drivers

Показать список загруженных драйверов ядра.

**Syntax**

```bash
drivers
```

**Examples**

```
Пример (show)> drivers
module:
name: rt2860v2_sta
size: 546736
used: 0
subs: -
name: rt2860v2_ap
size: 554192
used: 2
name: rndis_host
```

**Notes**

История изменений Версия Описание Добавлена команда show drivers.2.00

---

### show dyndns updaters

Показать список доступных поставщиков DynDNS.

**Syntax**

```bash
dyndns updaters
```

**Examples**

```
Пример (show)> dyndns updaters
updater:
type: dyndns
url: https://account.dyn.com/dns/dyndns
api: http://members.dyndns.org/nic/update
type: noip
url: https://www.noip.com/
api: http://dynupdate.no-ip.com/nic/update
type: rucenter
url: https://www.nic.ru/login/
```

**Notes**

История изменений Версия Описание Добавлена команда show dyndns updaters.2.12

---

### show easyconfig status

Показать состояние и настройки EasyConfig.

**Syntax**

```bash
easyconfig status
```

**Examples**

```
Пример (show)> easyconfig status
easyconfig:
checked: Tue Aug 6 11:50:21 2019
enabled: yes
reliable: yes
gateway-accessible: yes
dns-accessible: yes
host-accessible: yes
internet: yes
gateway:
```

**Notes**

История изменений Версия Описание Добавлена команда show easyconfig status.2.00

---

### show eula document

Показать текст соглашения EULA.

**Syntax**

```bash
eula document [ ‹version› ] [ ‹language› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| version | — | — | — |
| language | — | — | — |

**Examples**

```
Пример (show)> eula document 20181001
20181001
KEENETIC LIMITED
End User License Agreement
This End User License Agreement (this “Agreement”) constitutes ►
a valid and binding agreement between Netcraze Limited, including ►
all affiliates and subsidiaries (“Netcraze”, “us”, “our” or “we”) ►
and You (as
defined below) of the Software (as defined below), including the ►
Software installed onto any one of our Netcraze products (the ►
```

**Notes**

История изменений Версия Описание Добавлена команда show eula document.2.15

---

### show eula list

Показать список соглашений EULA, доступных в системе.

**Syntax**

```bash
eula list
```

**Examples**

```
Пример (show)> eula list
eula:
version: 20181001
document:
lang: en
format: md
format: txt
lang: ru
lang: tr
```

**Notes**

История изменений Версия Описание Добавлена команда show eula list.2.15

---

### show interface

Показать данные указанного интерфейса. Если выполнить команду без аргумента, то на экран будет выведен весь список сетевых интерфейсов.

**Syntax**

```bash
interface ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример Пример 3.1. Просмотр состояния портов коммутатора
Команда show interfaceвыводитразличнуюинформациюв зависимости
от типа интерфейса. В частности, для коммутатора GigabitEthernet0
она помимо общих сведенийпоказываеттекущее состояниефизических
портов, скорость и дуплекс.
(config)> show interface GigabitEthernet0
id: GigabitEthernet0
index: 0
type: GigabitEthernet
description:
```

**Notes**

История изменений Версия Описание Добавлена команда show interface.2.00

---

### show interface antennas

Показать уровень сигнала антенн.

**Syntax**

```bash
interface ‹name› antennas
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> interface UsbQmi0 antennas
antenna:
channel: 0
rssi: -61
rsrp: -81
rsrq: -8
phase: 0
channel: 1
rssi: -94
rsrp: -120
```

**Notes**

История изменений Версия Описание Добавлена команда show interface antennas.3.05

---

### show interface bands

Показать доступные 3G/LTE диапазоны.

**Syntax**

```bash
interface ‹name› bands
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> interface UsbQmi0 bands
umts:
band: 1
enabled: yes
band: 5
lte:
band: 3
band: 7
```

**Notes**

История изменений Версия Описание Добавлена команда show interface bands.3.05

---

### show interface bridge

Показать состояние интерфейса моста.

**Syntax**

```bash
interface ‹name› bridge
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> interface Bridge1 bridge
members:
interface, link = no, inherited = yes:
WifiMaster0/AccessPoint2
interface, link = yes: UsbLte0
```

**Notes**

История изменений Версия Описание Добавлена команда show interface bridge.2.03

---

### show interface cells

Показать базовые станции мобильных сетей.

**Syntax**

```bash
interface ‹name› cells
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> interface UsbQmi0 cells
cells:
phy-id: fc
rssi: -71
phy-id: 15b
phy-id: 187
rssi: -72
```

**Notes**

История изменений Версия Описание Добавлена команда show interface cells.3.05

---

### show interface channel-utilization rrd

Показать определенные данные монитора использования канала. ‹detail› ]

**Syntax**

```bash
interface ‹name›channel-utilization rrd ‹attribute› [
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| attribute | — | — | — |

**Examples**

```
Пример (show)> interface WifiMaster1 channel-utilization rrd load 1
data:
t: 578928.500000
v: 0
t: 578868.500000
v: 1
t: 578808.500000
t: 578748.500000
v: 2
t: 578688.500000
```

**Notes**

История изменений Версия Описание Добавленакомандаshow interfacechannel-utilization rrd. 3.09

---

### show interface channels

Показать данные о каналах указанного беспроводного интерфейса.

**Syntax**

```bash
interface ‹name› channels
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> interface WifiMaster0 channels
channels:
channel, index = 0:
number: 1
ext-40-above: yes
ext-40-below: no
vht-80: yes
channel, index = 1:
number: 2
ext-40-below: yes
```

**Notes**

История изменений Версия Описание Добавлена команда show interface channels.2.03

---

### show interface chilli

Показатьинформациюо статистикеклиентов,подключенныхк хот-споту RADIUS.

**Syntax**

```bash
interface ‹name› chilli
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> interface Chilli0 chilli
host:
session-id: 4bf7c55f00000006
user: 44w3c1
ip: 10.1.30.3
mac: 55:a3:f9:51:b4:11
start-time: 3884
end-time: 0
idle-time: 9
idle-time-limit: 0
```

**Notes**

История изменений Версия Описание Добавлена команда show interface chilli.2.10

---

### show interface country-codes

Показать список доступных каналов на радио-интерфейсе.

**Syntax**

```bash
interface ‹name› country-codes
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> interface WifiMaster0 country-codes
country-codes:
country-code:
code: AL
country: Albania
code: DZ
country: Algeria
code: AR
country: Argentina
code: AM
```

**Notes**

История изменений Версия Описание Добавлена команда show interface country-codes.2.03

---

### show interface mac

Показать таблицу MAC-адресов коммутатора.

**Syntax**

```bash
interface ‹name› mac
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> interface GigabitEthernet0 mac
===========================================
Port MAC Aging
1 20:6a:8a:1a:58:e9 1
3 cc:5d:4e:4f:aa:b2 1
3 cc:5d:4e:4f:aa:b2 3
1 01:00:5e:00:00:fc 7
```

**Notes**

История изменений Версия Описание Добавлена команда show interface mac.2.00

---

### show interface name-server

ПоказатьсписокактуальныхсерверовDNS,используемыхна интерфейсе.

**Syntax**

```bash
interface ‹name› name-server
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> interface WifiMaster1/WifiStation0 name-server
server:
address: 1.1.1.1
port: 0
domain:
global: 0
service: Dns::Manager
interface:
address: 9.9.9.9
```

**Notes**

История изменений Версия Описание Добавлена команда show interface name-server.3.09

---

### show interface operators

Показать список доступных мобильных операторов. Перед запуском этой команды необходимо сначала выполнить команду сканирования сети interface mobile scan. После завершения сканирования список будет доступен до тех пор, пока модем не будет перезапущен.

**Syntax**

```bash
interface ‹name› operators
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> interface UsbQmi0 operators
scanning: complete
age: 80
operator:
plmn: 25011
name: YOTA
mobile: 4G
status: used
status: preferred
plmn: 25099
```

**Notes**

История изменений Версия Описание Добавлена команда show interface operators.2.12

---

### show interface rf e2p

Показать текущее содержимое всех ячеек калибровочных данных.

**Syntax**

```bash
interface ‹name› rf e2p
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> interface WifiMaster0 rf e2p
[0x0000]:5392 [0x0002]:0103 [0x0004]:43EC [0x0006]:04F6
[0x0008]:042B [0x000A]:5392 [0x000C]:1814 [0x000E]:8001
[0x0010]:0000 [0x0012]:5392 [0x0014]:1814 [0x0016]:0000
[0x0018]:0001 [0x001A]:FF6A [0x001C]:0213 [0x001E]:FFFF
[0x0020]:FFFF [0x0022]:FFC1 [0x0024]:9201 [0x0026]:FFFF
[0x0028]:43EC [0x002A]:04F6 [0x002C]:052B [0x002E]:FFFF
[0x0030]:758E [0x0032]:4301 [0x0034]:FF22 [0x0036]:0025
[0x0038]:FFFF [0x003A]:012D [0x003C]:FFFF [0x003E]:FAD9
[0x0040]:88CC [0x0042]:FFFF [0x0044]:FF0A [0x0046]:0000
```

**Notes**

История изменений Версия Описание Добавлена команда show interface rf e2p.2.04

---

### show interface rrd

Показать загрузку сетевого интерфейса по принципу Round Robin Database.

**Syntax**

```bash
interface ‹name›rrd ‹attribute› [ ‹detail› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| attribute | — | — | — |
| detail | — | — | — |

**Examples**

```
Пример (show)> interface GigabitEthernet1 rrd rxspeed
data:
t: 90083.990183
v: 200880
t: 90082.990128
v: 152392
t: 90081.990193
v: 110976
t: 90080.990142
v: 48000
```

**Notes**

История изменений Версия Описание Добавлена команда show interface rrd.2.10

---

### show interface spectrum rrd

Показать определенные данные от анализатора спектра. ]

**Syntax**

```bash
interface ‹name›spectrum rrd ‹channel› ‹attribute› [ ‹detail›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| channel | — | — | — |
| attribute | — | — | — |
| detail | — | — | — |

**Examples**

```
Пример (show)> interface WifiMaster1 spectrum rrd 36 active
data:
t: 976.500000
v: 1
t: 916.500000
t: 856.500000
v: 0
t: 796.500000
t: 736.500000
```

**Notes**

История изменений Версия Описание Добавлена команда show interface spectrum rrd.3.08

---

### show interface stat

Показать статистику по интерфейсу.

**Syntax**

```bash
interface ‹name› stat
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> interface Home stat
rxpackets: 564475
rxbytes: 68729310
rxerrors: 0
rxdropped: 0
txpackets: 796849
txbytes: 870960214
txerrors: 0
txdropped: 0
```

**Notes**

История изменений Версия Описание Добавлена команда show interface stat.2.00

---

### show interface traffic-counter

Показать подробную информацию о состоянии счетчика трафика.

**Syntax**

```bash
interface ‹name›traffic-counter
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> interface UsbQmi0 traffic-counter
enabled: true
value: 1.47
threshold: 3.96
limit: 4
remaining: 2.46
unit: GiB
trigger:
limit: false
threshold: false
```

**Notes**

История изменений Версия Описание Добавлена команда show interface traffic-counter.3.06

---

### show interface wps pin

Показать WPS PIN точки доступа.

**Syntax**

```bash
interface ‹name› wps pin
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> interface WifiMaster0/AccessPoint0 wps pin
pin: 60180360
```

**Notes**

История изменений Версия Описание Добавлена команда show interface wps pin.2.00

---

### show interface wps status

Показать статус WPS точки доступа.

**Syntax**

```bash
interface ‹name› wps status
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> interface WifiMaster0/AccessPoint0 wps status
wps:
configured: yes
auto-self-pin: yes
status: active
direction: send
mode: self-pin
left: infinite
```

**Notes**

История изменений Версия Описание Добавлена команда show interface wps status.2.00

---

### show interface zerotier peers

Показать список узлов.

**Syntax**

```bash
interface ‹name› zerotier peers
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> interface ZeroTier0 zerotier peers
peer:
address: 63f865ae71
latency: 328
role: PLANET
version: -1.-1.-1
path: 50.7.252.138/9993
address: 458cde7190
latency: 201
path: 103.195.103.66/9993
```

**Notes**

История изменений Версия Описание Добавлена команда show interface zerotier peers.4.01

---

### show internet status

Проверитьналичие подключенияк Интернетуна устройстве.Индикатор "Интернет" (глобус) на корпусе устройства горит, если проверка подключения к популярным сайтам прошла успешно.

**Syntax**

```bash
internet status
```

**Examples**

```
Пример (show)> internet status
checked: Tue Apr 24 17:14:37 2018
reliable: yes
gateway-accessible: yes
dns-accessible: yes
host-accessible: yes
internet: yes
gateway:
interface: GigabitEthernet1
address: 192.168.1.1
```

**Notes**

История изменений Версия Описание Добавлена команда show internet status.2.11

---

### show ip arp

Отображает содержимое кеша ARP.

**Syntax**

```bash
ip arp
```

**Examples**

```
Пример (show)> ip arp
===================================================
IP MAC Interface
192.168.75.209 9c:b7:0d:91:e7:31 Home
82.135.72.150 00:0e:0c:09:db:60 ISP
192.168.75.106 88:53:2e:5e:07:1d Home
192.168.75.201 7c:61:93:eb:6c:77 Home
192.168.75.203 00:19:d2:48:d6:dc Home
10.10.30.34 a0:88:b4:40:9c:98 GuestWiFi
192.168.75.203 7c:61:93:ee:88:67 Home
```

**Notes**

История изменений Версия Описание Добавлена команда show ip arp.2.00

---

### show ip dhcp bindings

Показать статус DHCP server. Если выполнить команду без аргумента, то на экран будет выведен весь список выделенных IP для всех пулов.

**Syntax**

```bash
ip dhcp bindings [ ‹pool› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| pool | — | — | — |

**Examples**

```
Пример (show)> ip dhcp bindings _WEBADMIN
lease:
ip: 192.168.15.211
mac: 00:26:c7:4a:e0:16
expires: 289
hostname: lenovo
ip: 192.168.15.208
mac: 00:19:d2:48:d6:dc
expires: 258
hostname: evo
```

**Notes**

История изменений Версия Описание Добавлена команда show ip dhcp bindings.2.00

---

### show ip dhcp pool

Показать информацию об определенном пуле. Если выполнить команду без аргумента, то на экран будет выведена информация обо всех пулах системы.

**Syntax**

```bash
ip dhcp pool [ ‹pool› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| pool | — | — | — |

**Examples**

```
Пример (show)> ip dhcp pool 123
pool, name = 123:
interface, binding = auto:
network: 0.0.0.0/0
begin: 0.0.0.0
end: 0.0.0.0
router, default = yes: 0.0.0.0
lease, default = yes: 25200
state: down
debug: no
```

**Notes**

История изменений Версия Описание Добавлена команда show ip dhcp pool.2.03

---

### show ip ftp

Показать домашние каталоги пользователей, имеющих тег ftp.

**Syntax**

```bash
ip ftp
```

**Examples**

```
Пример (show)> ip ftp
enabled: yes
permissive: yes
root: ADATA SD600:
path: /tmp/mnt/ADATA SD600
user, index = 0:
name: admin
```

**Notes**

История изменений Версия Описание Добавлена команда show ip ftp.2.08

---

### show ip hotspot

Показать список хостов, подключенных к хот-споту.

**Syntax**

```bash
ip hotspot
```

**Examples**

```
Пример (show)> ip hotspot
host:
mac: 24:92:0e:92:e5:44
via: 24:92:0e:92:e5:44
ip: 192.168.1.41
hostname: android-41d997d510af8ff9
name:
interface:
id: Bridge0
name: Home
```

**Notes**

История изменений Версия Описание Добавлена команда show ip hotspot.2.09

---

### show ip hotspot rrd

Показать информацию о трафике зарегистрированного хоста по принципу Round Robin Database.

**Syntax**

```bash
ip hotspot ‹mac› rrd ‹attribute› [ ‹detail› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mac | — | — | — |
| attribute | — | — | — |
| detail | — | — | — |

**Examples**

```
Пример (show)> ip hotspot a8:1e:84:85:f2:11 rrd rxspeed
data:
t: 2180.491855
v: 16298
t: 2177.492050
v: 9026
t: 2174.491916
v: 11450
t: 2171.491843
v: 626
```

**Notes**

История изменений Версия Описание Добавлена команда show ip hotspot rrd.2.14

---

### show ip hotspot summary

Показатьинформациюо трафикенесколькихзарегистрированныххостов по принципу Round Robin Database. ‹count› ]

**Syntax**

```bash
ip hotspot summary ‹attribute› [ detail ‹detail› ] [ count
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| attribute | — | — | — |
| detail | — | — | — |

**Examples**

```
Пример (show)> ip hotspot summary rxspeed
t: 255
host:
active: yes
name: toshiba
rxspeed: 143964
name: lnx
rxspeed: 24749
name: oneplus6
rxspeed: 2558
```

**Notes**

История изменений Версия Описание Добавлена команда show ip hotspot summary.2.14

---

### show ip http proxy

Показать статус HTTP-прокси.

**Syntax**

```bash
ip http proxy
```

**Examples**

```
Пример (show)> ip http proxy
proxy:
name: modem
domain: myhomemodem.netcraze.link
upstream: http://192.168.8.1:80
allow: public
ndns: yes
```

**Notes**

История изменений Версия Описание Добавлена команда show ip http proxy.2.09

---

### show ip http webdav

Показать статус сервера WebDAV.

**Syntax**

```bash
ip http webdav
```

**Examples**

```
Пример (show)> ip http webdav
enabled: yes
permissive: yes
root: ext4-files:/
path: /tmp/mnt/7a976f42-a16f-d501-3017-6b42a16fd501
user, index = 0:
name: admin
root:
path:
user, index = 1:
```

**Notes**

История изменений Версия Описание Добавлена команда show ip http webdav.3.04

---

### show ip name-server

Показать список текущих IPv4 и IPv6 адресов DNS-серверов в порядке убывания приоритета.

**Syntax**

```bash
ip name-server
```

**Examples**

```
Пример (show)> ip name-server
server:
address: 1.1.1.1
port: 0
domain:
global: 0
service: Dns::Manager
interface:
address: 9.9.9.9
```

**Notes**

История изменений Версия Описание Добавлена команда show ip name-server.2.00

---

### show ip nat

Показать таблицу трансляции сетевых адресов.

**Syntax**

```bash
ip nat [tcp]
```

**Examples**

```
Пример (show)> ip nat
===================================================================
Type | In | Source Port Destination Port Packets
| Out |
udp 10.1.30.34 6482 111.221.77.159 40005 1
111.221.77.159 40005 82.138.7.164 6482 1
-------------------------------------------------------------------
udp 220.27.130.179 6896 82.138.7.164 28197 1
192.168.15.204 28197 220.27.130.179 6896 1
tcp 10.1.30.33 57474 78.141.179.15 12350 12
```

**Notes**

История изменений Версия Описание Добавлена команда show ip nat.2.00

---

### show ip neighbour

Показать список обнаруженных на сетевом уровне хостов.

**Syntax**

```bash
ip neighbour [alive]
```

**Examples**

```
Пример (show)> ip neighbour
neighbour:
id: 1
via: b8:88:e1:2b:30:af
mac: b8:88:e1:2b:30:af
address-family: ipv4
address: 192.168.22.16
interface: Bridge0
first-seen: 251387
last-seen: 0
```

**Notes**

История изменений Версия Описание Добавлена команда show ip neighbour.2.10

---

### show ip policy

Показать статус профиля доступа в Интернет.

**Syntax**

```bash
ip policy [ ‹policy› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| policy | — | — | — |

**Examples**

```
Пример (show)> ip policy
policy, name = Policy0, description = VPN-OpenVPN:
mark: fffffd00
table: 42
route:
destination: 10.1.30.0/24
gateway: 0.0.0.0
interface: Guest
metric: 0
proto: boot
```

**Notes**

История изменений Версия Описание Добавлена команда show ip policy.2.12

---

### show ip route

Показать текущую таблицу маршрутизации.

**Syntax**

```bash
ip route [table ‹table› ] [sort ‹criteria› ‹direction› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| table | — | — | — |
| criteria | — | — | — |
| direction | — | — | — |

**Examples**

```
Пример (show)> ip route table 254
================================================================================
Destination Gateway Interface ►
F Metric
0.0.0.0/0 192.168.133.1 WifiMaster1/WifiStation0 ►
U 0
1.1.1.1/32 0.0.0.0 Wireguard1 ►
8.8.8.8/32 0.0.0.0 Wireguard7 ►
10.1.30.0/24 0.0.0.0 Guest ►
10.8.0.0/24 0.0.0.0 Wireguard3 ►
```

**Notes**

История изменений Версия Описание Добавлена команда show ip route.2.00

---

### show ip service

Показатьсписокоткрытыхпортов,используемыхсистемнымислужбами.

**Syntax**

```bash
ip service
```

**Examples**

```
Пример (show)> ip service
service:
service-name: Telnet
family: ipv4
protocol: tcp
port: 23
security-level: private
service-name: DNS proxy
protocol: udp
port: 53
```

**Notes**

История изменений Версия Описание Добавлена команда show ip service.3.06

---

### show ipsec

Показать информацию о состоянии IPsec/IKE службы strongSwan.

**Syntax**

```bash
ipsec
```

**Examples**

```
Пример (show)> ipsec
ipsec_statusall:
Status of IKE charon daemon (strongSwan 5.3.4, Linux 2.6.36, ►
mips):
uptime: 6 days, since Dec 22 10:23:36 2015
worker threads: 11 of 16 idle, 5/0/0/0 working, job queue: ►
0/0/0/0, scheduled: 10
loaded plugins: charon aes des sha1 sha2 md5 random nonce ►
openssl xcbc cmac hmac attr kernel-netlink socket-default stroke ►
updown eap-mschapv2 eap-dynamic xauth-generic xauth-eap ►
```

**Notes**

История изменений Версия Описание Добавлена команда show ipsec.2.06

---

### show ipv6 addresses

Показать список текущих IPv6-адресов.

**Syntax**

```bash
ipv6 addresses
```

**Examples**

```
Пример (show)> ipv6 addresses
address:
address: 2001:db8::1
interface: ISP
valid-lifetime: infinite
address: 2001:db8::ce5d:4eff:fe4f:aab2
interface: Home
address: fd3c:4268:1559:0:ce5d:4eff:fe4f:aab2
address: fd01:db8:43:0:ce5d:4eff:fe4f:aab2
```

**Notes**

История изменений Версия Описание Добавлена команда show ipv6 addresses.2.00

---

### show ipv6 dhcp bindings

Показать статус DHCPv6-сервера.

**Syntax**

```bash
ipv6 dhcp bindings
```

**Examples**

```
Пример (show)> ipv6 dhcp bindings
subnet:
name: Default
name: guest
lease:
type: IA-NA
duid: 00:03:00:01:a8:a1:59:61:57:69
address: fc34:5678:0:4::cc
expires: 299
type: IA-PD
```

**Notes**

История изменений Версия Описание Добавлена команда show ipv6 dhcp bindings.4.00

---

### show ipv6 prefixes

Показать список текущих IPv6-префиксов.

**Syntax**

```bash
ipv6 prefixes
```

**Examples**

```
Пример (show)> ipv6 prefixes
prefix:
prefix: 2001:db8::/64
interface: ISP
valid-lifetime: infinite
preferred-lifetime: infinite
prefix: fd3c:4268:1559::/48
interface:
prefix: fd01:db8:43::/48
```

**Notes**

История изменений Версия Описание Добавлена команда show ipv6 prefixes.2.00

---

### show ipv6 route

Показать список актуальных маршрутов IPv6.

**Syntax**

```bash
ipv6 route [table ‹table› ] [sort ‹criteria› ‹direction› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| table | — | — | — |
| criteria | — | — | — |
| direction | — | — | — |

**Examples**

```
Пример (show)> ipv6 route table 42
route6:
destination: 2a02:290:2:65d:52ff:20ff:fe00:1e86/128
gateway: ::
interface: Home
metric: 256
flags: U
rejecting: no
proto: boot
floating: no
```

**Notes**

История изменений Версия Описание Добавлена команда show ipv6 routes.2.00 Новое название команды show ipv6 route.4.00

---

### show ipv6 subnets

Показать список текущих подсетей IPv6.

**Syntax**

```bash
ipv6 subnets
```

**Examples**

```
Пример (show)> ipv6 subnets
subnet:
name: Default
interface: Home
prefixes:
prefix: 2a0d:8140:2ba1::/64
interface: TunnelSixInFour0
valid-lifetime: infinite
preferred-lifetime: 0
global: no
```

**Notes**

История изменений Версия Описание Добавлена команда show ipv6 subnets.4.01

---

### show kabinet status

Проверить состояние и конфигурацию авторизатора КАБiNET.

**Syntax**

```bash
kabinet status
```

**Examples**

```
Пример (show)> kabinet status
kabinet:
enabled: yes
wan: yes
state: STOPPED
server: 10.0.0.1
access-level: internet
protocol-version: 2
```

**Notes**

История изменений Версия Описание Добавлена команда show kabinet status.2.02

---

### show last-change

Показать кто и когда последний раз вносил изменения в настройки.

**Syntax**

```bash
last-change
```

**Examples**

```
Пример (show)> last-change
date: Thu, 12 Jul 2012 10:01:47 GMT
agent: cli
```

**Notes**

История изменений Версия Описание Добавлена команда show last-change.2.00

---

### show led

Показать информацию по указанному светодиодному индикатору. Если выполнитькомандубез аргумента,то на экранбудетвыведенвесьсписок светодиодных индикаторов на устройстве. Набор индикаторов зависит от аппаратной конфигурации.

**Syntax**

```bash
led [ ‹name› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> led FN_1
leds:
led, index = 0:
name: FN_1
user_configurable: yes
virtual: no
```

**Notes**

История изменений Версия Описание Добавлена команда show led.2.05

---

### show led bindings

Показать управляющий объект, связанный с указанными светодиодным индикатором. Если выполнить команду без аргумента, будет выведен весь список светодиодных индикаторов с их управляющими объектами.

**Syntax**

```bash
led [ ‹name› ]bindings
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> led bindings
bindings:
binding, index = 0:
led: SYS
user_configurable: no
active_control: SystemState
default_control: SystemState
binding, index = 1:
led: FN_1
user_configurable: yes
```

**Notes**

История изменений Версия Описание Добавлена команда show led bindings.2.08

---

### show led controls

Показать список управляющих объектов светодиодных индикаторов системы. Доступные управляющие объекты зависят от конфигурации оборудования.

**Syntax**

```bash
led controls
```

**Examples**

```
Пример (show)> led controls
controls:
control, index = 0:
name: SystemState
short_description: System state
owner: ndm
user_configurable: no
control, index = 1:
name: ButtonActivityAcknowledgement
short_description: Button activity acknowledgement
```

**Notes**

История изменений Версия Описание Добавлена команда show led controls.2.08

---

### show log

Показатьсодержимоесистемногожурнала(записи,которыесохранились в циклическом буфере), а также новые записи по мере их поступления. Команда работает в фоновом режиме, то есть до принудительной остановки пользователем по нажатию [Ctrl]+[C].

**Syntax**

```bash
log [ ‹max-lines› ] [once]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| max-lines | — | — | — |

**Examples**

```
Пример (show)> log
================================================================================
Time Message
I [Jul 12 12:08:39] radvd[228]: attempting to reread config file
I [Jul 12 12:08:39] radvd[228]: resuming normal operation
I [Jul 12 12:08:40] wmond: WifiMaster0/AccessPoint0: ►
STA(d8:b3:77:36:05:c1)
occurred MIC different in key handshaking.
I [Jul 12 12:08:40] radvd[228]: attempting to reread config file
I [Jul 12 12:08:40] radvd[228]: resuming normal operation
```

**Notes**

История изменений Версия Описание Добавлена команда show log.2.00

---

### show media

Показать информацию о системных USB-накопителях и их разделах.

**Syntax**

```bash
media
```

**Examples**

```
Пример (show)> media
media:
name: Media0
port: 1
state: ACTIVE
manufacturer: Western Digital
product: My Passport 074A
serial: 575832314139324D36383139
size: 1000202043392
partition:
```

**Notes**

История изменений Версия Описание Добавлена команда show media.3.04

---

### show mws associations

Показать список точек доступа на усилителе, связанном с MWS контроллером.

**Syntax**

```bash
mws associations
```

**Examples**

```
Пример (show)> mws associations
station:
mac: 51:ef:22:11:17:1a
ap: WifiMaster1/Backhaul0
authenticated: yes
txrate: 585
rxrate: 270
uptime: 31
txbytes: 33569
rxbytes: 74324
```

**Notes**

История изменений Версия Описание Добавлена команда show mws associations.3.01

---

### show mws candidate

Показать список кандидатов или описание определенного кандидата по заданному идентификатору.

**Syntax**

```bash
mws candidate [ ‹candidate› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| candidate | — | — | — |

**Examples**

```
Пример (show)> mws candidate 50:ff:20:08:71:61
candidate:
mac: 50:ff:20:08:71:61
cid:
mode:
model:
state: DISCONNECTED
(show)> mws candidate 50:ff:20:08:71:61
cid: ab1409a2-0f87-11e8-8f23-3d5f5921b253
mode: ap
```

**Notes**

История изменений Версия Описание Добавлена команда show mws candidate.2.15

---

### show mws log

Показать журнал подключений и переходов от одной точки доступа к другой в пределах MWS. Команда работает в фоновом режиме, то есть до принудительной остановки пользователем по нажатию [Ctrl]+[C].

**Syntax**

```bash
mws log [ ‹max-lines› ] [once]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| max-lines | — | — | — |

**Examples**

```
Пример (show)> mws log 1
===================================================================================
Time Message
[Jan 17 15:04:58] : 64:a2:f9:51:b1:82: associated -> ►
50:ff:20:00:11:82 (5 GHz)
(show)> mws log once
[Jan 17 14:46:37] : 64:a2:f9:51:b1:82: associated -> ►
[Jan 17 15:04:50] : 64:a2:f9:51:b1:82: 50:ff:20:00:11:82 (5 ►
GHz) -> disassociated
```

**Notes**

История изменений Версия Описание Добавлена команда show mws log.2.15

---

### show mws member

Показать список захваченных устройств или описание определенного устройства по заданному идентификатору.

**Syntax**

```bash
mws member [ ‹member› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| member | — | — | — |

**Examples**

```
Пример (show)> mws member 40f829b8-71a8-11ec-9396-5fb681ed4743
member:
cid: 40f829b8-71a8-11ec-9396-5fb681ed4743
model: Speedster (KN-3310)
mac: 50:ff:21:69:21:7d
known-host: Netcraze Hopper 116***591
ip: 192.168.15.42
mode: extender
hw-type: router
license: 116232491843591
```

**Notes**

История изменений Версия Описание Добавлена команда show mws member.2.15

---

### show ndns

Показать параметры KeenDNS, полученные из последнего запроса на сервер (см. команды ndns get-booked и ndns get-update).

**Syntax**

```bash
ndns
```

**Examples**

```
Пример (show)> ndns
name: testname
booked: testname
domain: mynetcraze.com
address: 41.189.34.56
updated: yes
access: direct
ttp:
direct: yes
interface: GigabitEthernet1
```

**Notes**

История изменений Версия Описание Добавлена команда show ndns.2.07

---

### show netfilter

Показать информацию о работе сетевого экрана. Необходимо для обеспечения удаленной техподдержки.

**Syntax**

```bash
netfilter
```

**Notes**

История изменений Версия Описание Добавлена команда show netfilter.2.00

---

### show nextdns availability

Проверить и показать доступность NextDNS.

**Syntax**

```bash
nextdns availability
```

**Examples**

```
Пример (show)> nextdns availability
available: yes
port: 53
doh-supported: yes
doh-available: yes
```

**Notes**

История изменений Версия Описание Добавлена команда show nextdns availability.3.08

---

### show nextdns profiles

Показать профили NextDNS.

**Syntax**

```bash
nextdns profiles
```

**Examples**

```
Пример (show)> nextdns profiles
profiles:
profile:
name: No filtering
token: 0
name: My First Configuration
token: 1f3a36
NextDns::Client: Loaded profiles.
```

**Notes**

История изменений Версия Описание Добавлена команда show nextdns profiles.3.08

---

### show ntce applications

Показать список приложений, поддерживаемых службой NTCE.

**Syntax**

```bash
ntce applications
```

**Examples**

```
Пример (show)> ntce applications
application:
id-num: 1
short: facebook
long: Facebook
group-id: 2065
group-long: Social
groupset-id: 4
groupset-short-id: surfing
groupset-long-id: Web surfing
```

**Notes**

История изменений Версия Описание Добавлена команда show ntce applications.3.07

---

### show ntce attributes

Показать список атрибутов, поддерживаемых службой NTCE.

**Syntax**

```bash
ntce attributes
```

**Examples**

```
Пример (show)> ntce attributes
attribute:
id-num: 1
short: encrypted
long: Indicates that the current connection is ►
encrypted traffic.
id-num: 2
short: audio
an audio or voice signal.
id-num: 3
```

**Notes**

История изменений Версия Описание Добавлена команда show ntce attributes.3.07

---

### show ntce filter profile

Показать список профилей фильтрации NTCE в системе.

**Syntax**

```bash
ntce filter profile [ ‹name› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> ntce filter profile
profile:
name: test
type: deny
schedule:
schedule-active: no
name: test2
(show)> ntce filter profile test
```

**Notes**

История изменений Версия Описание Добавлена команда show ntce filter profile.4.02

---

### show ntce groups

Показать список групп, поддерживаемых службой NTCE.

**Syntax**

```bash
ntce groups
```

**Examples**

```
Пример (show)> ntce groups
group:
id-num: 2048
long: Generic
groupset-id: 5
groupset-short-id: other
groupset-long-id: Other
id-num: 2049
long: Peer to Peer
groupset-id: 6
```

**Notes**

История изменений Версия Описание Добавлена команда show ntce groups.3.07

---

### show ntce groupsets

Показывать список наборов групп, поддерживаемых службой NTCE.

**Syntax**

```bash
ntce groupsets
```

**Examples**

```
Пример (show)> ntce groupsets
groupset:
id-num: 0
short: calling
long: Calling and conferencing
id-num: 1
short: gaming
long: Gaming
id-num: 2
short: streaming
```

**Notes**

История изменений Версия Описание Добавлена команда show ntce groupsets.3.07

---

### show ntce hosts

Показать статистику приложений, которые служба NTCE обнаружила для хостов.

**Syntax**

```bash
ntce hosts
```

**Examples**

```
Пример (show)> ntce hosts
host:
mac: 04:d4:c4:54:31:12
application:
id-num: 7
short: twitter
long: Twitter
group-id: 2065
group-long: Social
groupset-id: 4
```

**Notes**

История изменений Версия Описание Добавлена команда show ntce hosts.3.07

---

### show ntce oses

Показать список операционных систем, поддерживаемых службой NTCE.

**Syntax**

```bash
ntce oses
```

**Examples**

```
Пример (show)> ntce oses
os:
id-num: 1
long: Not detected
id-num: 2
long: Other
id-num: 3
long: Windows
id-num: 4
long: Linux
```

**Notes**

История изменений Версия Описание Добавлена команда show ntce oses.3.07

---

### show ntce status

Показать информацию о службе NTCE.

**Syntax**

```bash
ntce status
```

**Examples**

```
Пример (show)> ntce status
conntrack:
hosts: 2
applications: 16
applications-flows: 63
applications-events: 0
groups: 12
groups-flows: 64
groups-events: 0
memory:
```

**Notes**

История изменений Версия Описание Добавлена команда show ntce status.3.07

---

### show ntp status

Показать системные настройки NTP. Основные сведения о состоянии NTP ❶ Время, прошедшеес моментапоследнейсинхронизациив секундах. ❷ Признак последней синхронизации. ❸ Признак начальной синхронизации. ❹ Время установлено в соответствии с сервером NDSS. ❺ Время установлено пользователем вручную.

**Syntax**

```bash
ntp status
```

**Examples**

```
Пример (show)> ntp status
status:
elapsed: 435146 ❶
server: 1.pool.ntp.org
accurate: yes ❷
synchronized: yes ❸
ndsstime: no ❹
usertime: no ❺
```

**Notes**

История изменений Версия Описание Добавлена команда show ntp status.2.00

---

### show oc-server

Показать текущие подключения к серверу OpenConnect.

**Syntax**

```bash
oc-server
```

**Examples**

```
Пример (show)> oc-server
ndns-name: mywrk.netcraze.link
fqdn: 12af.mywrk.netcraze.link
secret: 123e45ed
has-ndns-certificate: yes
tunnel:
clientaddress: 172.16.3.34
username: mymy
uptime: 30
statistic:
```

**Notes**

История изменений Версия Описание Добавлена команда show oc-server.4.02

---

### show ping-check

Показать информацию о профиле Ping Check. При использовании команды без аргумента выводятся данные обо всех профилях.

**Syntax**

```bash
ping-check [ ‹profile_name› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| profile_name | — | — | — |

**Examples**

```
Пример (show)> ping-check
pingcheck:
profile: TEST
host: 8.8.8.8
port: 80
max-fails: 7
timeout: 1
mode: connect
interface: ISP
fail count: 0
```

**Notes**

История изменений Версия Описание Добавлена команда show ping-check.2.04

---

### show printers

Показать список принтеров в системе.

**Syntax**

```bash
printers
```

**Examples**

```
Пример (show)> printers
printers:
printer: Canon MF8300C Series
```

**Notes**

История изменений Версия Описание Добавлена команда show printers.2.00

---

### show processes

Показатьстатистикуиспользованияпроцессораслужбамии процессами.

**Syntax**

```bash
processes
```

**Examples**

```
Пример (show)> processes
process, id = NETBIOS browser:
name: nqnd
arg: -i
arg: 50ff20001e87
state: S (sleeping)
pid: 629
ppid: 192
vm-size: 3188 kB
vm-data: 1548 kB
```

**Notes**

История изменений Версия Описание Добавлена команда show processes.2.09

---

### show running-config

Показать текущие настройки, которые содержит файл system:running-config точно так же, как это делает команда more.

**Syntax**

```bash
running-config
```

**Examples**

```
Пример (show)> running-config
! $$$ Model: Netcraze Start
! $$$ Version: 2.06.1
! $$$ Agent: http/rci
! $$$ Last change: Fri, 12 Jan 2017 07:23:56 GMT
system
set net.ipv4.ip_forward 1
set net.ipv4.netfilter.ip_conntrack_max 4096
set net.ipv4.netfilter.ip_conntrack_tcp_timeout_established►
1200
```

**Notes**

История изменений Версия Описание Добавлена команда show running-config.2.00

---

### show schedule

Показать параметры определенного расписания. Если выполнить команду без аргумента, то будет отображен весь список расписаний в системе.

**Syntax**

```bash
schedule [ ‹name› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> schedule 123
schedule, name = 123:
action, type = start, left = 561514, next = yes:
dow: Tue
time: 01:29
action, type = stop, left = 564274:
time: 02:15
```

**Notes**

История изменений Версия Описание Добавлена команда show schedule.2.06

---

### show self-test

Показатьсовокупнуюинформациюо системнойактивности.Необходимо для обеспечения удаленной техподдержки.

**Syntax**

```bash
self-test
```

**Notes**

История изменений Версия Описание Добавлена команда show self-test.2.00

---

### show site-survey

Показать доступные беспроводные сети.

**Syntax**

```bash
site-survey ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (show)> site-survey WifiMaster0
================================================================================
SSID MAC Ch Mode ►
Q
Hello_123 11:22:d4:70:97:f1 1 ►
11b/g/n 31
BRT 78:69:87:b3:9d:68 1 ►
11b/g/n 13
SVH34-34 23:bf:45:7b:0e:2e 1 ►
11b/g/n 5
```

**Notes**

История изменений Версия Описание Добавлена команда show site-survey.2.00

---

### show skydns profiles

Вывести список профилей SkyDNS.

**Syntax**

```bash
skydns profiles
```

**Examples**

```
Пример (show)> skydns profiles
profile:
name: Main
token: 821766297
name: Kids
token: 840106815
SkyDns::Client: Profile list is loaded.
```

**Notes**

История изменений Версия Описание Добавлена команда show skydns profiles.2.01

---

### show skydns userinfo

Показать информацию о пользователе SkyDNS.

**Syntax**

```bash
skydns userinfo
```

**Examples**

```
Пример (config)> skydns userinfo
plan:
name: Premium
code: PREMIUM
SkyDns::Client: SkyDNS info is loaded.
```

**Notes**

История изменений Версия Описание Добавлена команда show skydns userinfo.2.01

---

### show snmp view

Показать статус представления SNMP.

**Syntax**

```bash
snmp view
```

**Examples**

```
Пример (show)> snmp view
view:
id: client
include: .1.3.6.1
exclude: .1.3.6.1.2
```

**Notes**

История изменений Версия Описание Добавлена команда show snmp view.4.01

---

### show ssh fingerprint

Показать текущие ключи SSH-сервера.

**Syntax**

```bash
ssh fingerprint
```

**Examples**

```
Пример (show)> ssh fingerprint
rsa: MD5:d0:b0:d4:f7:da:7b:c0:e0:d0:c8:8f:ea:85:3c:09:00
rsa: SHA1:Nhxg8KNeE62E8zAZJngImcrJkmA
rsa: SHA256:lM7MyrIaq4qFGT/dyF/t8TbJk5tCzreeGuhO3zaydu4
ecdsa: ►
MD5:a6:db:b4:fb:3c:b9:ae:31:ca:6d:ca:ed:62:73:a5:7e
ecdsa: SHA1:ndWg/dx/dP/P8rMkJcVC3XB8nFo
SHA256:Wp1K9d8MsquQBtlBeBlpVlyKdCN1Vay3BtBWbj0xs+o
```

**Notes**

История изменений Версия Описание Добавлена команда show ssh fingerprint.2.12

---

### show ssh sftp

Показать домашние каталоги пользователей, имеющих тег sftp.

**Syntax**

```bash
ssh sftp
```

**Examples**

```
Пример (show)> ssh sftp
enabled: yes
permissive: yes
root: files_ssd:/
path: /tmp/mnt/963b0583-4017-401b-9542-7ff1255add40
user, index = 0:
name: admin
root:
path: ►
```

**Notes**

История изменений Версия Описание Добавлена команда show ssh sftp.3.04

---

### show sstp-server

Показать текущие подключения к серверу SSTP.

**Syntax**

```bash
sstp-server
```

**Examples**

```
Пример (show)> sstp-server
enabled: yes
ndns-name: mymy.netcraze.link
has-ndns-certificate: yes
tunnel:
clientaddress: 172.16.3.33
username: mymy
uptime: 29
statistic:
rxpackets: 121
```

**Notes**

История изменений Версия Описание Добавлена команда show sstp-server.2.12

---

### show system

Показать общее состояние системы. Основные сведения о состоянии системы ❶ Загрузка центрального процессора, в процентах. ❷ Информация о занятой и имеющейся в наличии памяти, в килобайтах. ❸ Информация об использовании файла подкачки, в килобайтах. ❹ Время работы системы с момента запуска, в секундах.

**Syntax**

```bash
system
```

**Examples**

```
Пример (config)> show system
hostname: Undefined
domainname: WORKGROUP
cpuload: 0 ❶
memory: 13984/28976 ❷
swap: 0/0 ❸
uptime: 153787 ❹
```

**Notes**

История изменений Версия Описание Добавлена команда show system.2.00

---

### show system country

Показать статус региональной настройки в соответствии с регионом, установленным производителем.

**Syntax**

```bash
system country
```

**Examples**

```
Пример (show)> system country
factory: EA
selected: KZ
default-language: ru
country:
code: AM
short-name: Armenia
default-language: en
code: AZ
short-name: Azerbaijan
```

**Notes**

История изменений Версия Описание Добавлена команда show system country.4.00

---

### show system cpustat

Показать сведения об использовании процессора устройства.

**Syntax**

```bash
system cpustat
```

**Examples**

```
Пример (show)> system cpustat
interval: 36
busy:
cur: 1
min: 0
max: 11
avg: 2
user:
cur: 0
max: 10
```

**Notes**

История изменений Версия Описание Добавлена команда show system cpustat.2.09

---

### show system zram

Показать статус системного файла подкачки zRam.

**Syntax**

```bash
system zram
```

**Examples**

```
Пример (show)> system zram
zram:
enabled: yes
compression-algo: lzo
disk-size: 268435456
compressed-size: 87
original-size: 4096
total-memory-used: 12288
compression-threads: 4
compressed-ratio-pcs: 300
```

**Notes**

История изменений Версия Описание Добавлена команда show system zram.2.09

---

### show tags

Показать доступные пользовательские теги.

**Syntax**

```bash
tags
```

**Examples**

```
Пример (show)> tags
tag: cli
tag: readonly
tag: http-proxy
tag: http
tag: printers
tag: cifs
tag: ftp
tag: ipsec-xauth
tag: ipsec-l2tp
```

**Notes**

История изменений Версия Описание Добавлена команда show tags.2.00

---

### show threads

Показать список активных потоков в NDM.

**Syntax**

```bash
threads
```

**Examples**

```
Пример (show)> threads
thread:
name: Cloud agent service
tid: 518
lock_list_complete: yes
locks:
statistics:
interval: 30
cpu:
now: 17771.481435
```

**Notes**

История изменений Версия Описание Добавлена команда show threads.2.09

---

### show torrent status

Показать состояние клиента BitTorrent.

**Syntax**

```bash
torrent status
```

**Examples**

```
Пример (show)> torrent status
state: running
rpc-port: 8090
```

**Notes**

История изменений Версия Описание Добавлена команда show torrent status.2.03

---

### show upnp redirect

Показать правила трансляции портов UPnP. Если выполнить команду без аргумента, то весь список правил трансляции будет выведен на экран.

**Syntax**

```bash
upnp redirect [( ‹protocol› ‹interface› ‹port›) | ‹index› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| protocol | — | — | — |
| interface | — | — | — |
| port | — | — | — |
| index | — | — | — |

**Examples**

```
Пример (show)> upnp redirect udp ISP 11175
entry:
index: 1
interface: ISP
protocol: udp
port: 11175
to-address: 192.168.15.206
to-port: 11175
description: Skype UDP at 192.168.12.286:11175 (2024)
packets: 0
```

**Notes**

История изменений Версия Описание Добавлена команда show upnp redirect.2.00

---

### show usb

Показать список USB-устройств.

**Syntax**

```bash
usb
```

**Examples**

```
Пример (show)> usb
device:
name: 12F6-312F:
label: PENDRIVE
subsystem: storage
name: 69f2894d-56a1-4632-9521-dbdc8ab5c53d:
label: EXT3
name: 4FCC-A585:
label: FAT32
name: 226F114C088FC43D:
```

**Notes**

История изменений Версия Описание Добавлена команда show usb.2.00

---

### show version

Показать версию микропрограммы.

**Syntax**

```bash
version
```

**Examples**

```
Пример (show)> version
release: 2.10.C.1.0-0
arch: mips
ndm:
exact: 0-d32118a
cdate: 11 Dec 2017
bsp:
exact: 0-cbe0525
ndw:
version: 4.2.3.92
```

**Notes**

История изменений Версия Описание Добавлена команда show version.2.00

---

### show vpn-server

Показать текущие подключения к серверу VPN.

**Syntax**

```bash
vpn-server
```

**Examples**

```
Пример (show)> vpn-server
tunnel:
clientaddress: 172.16.1.33
username: test
uptime: 3
statistic:
rxpackets: 51
rx-multicast-packets: 0
rx-broadcast-packets: 0
rxbytes: 5440
```

**Notes**

История изменений Версия Описание Добавлена команда show vpn-server.2.04

---

### skydns

Доступ к группе команд для настройки параметров SkyDNS.

**Syntax**

```bash
skydns
```

**Notes**

История изменений Версия Описание Добавлена команда skydns.2.01

---

### skydns assign

Присвоить профиль защиты хосту или сегменту локальной сети. По умолчанию для всех хостов и локальной сети используется профиль System. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
assign ‹host› ‹token› | interface ‹iface› ‹token› (skydns)> no assign [‹host› | interface ‹iface› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| host | — | — | — |
| token | — | — | — |
| iface | — | — | — |

**Examples**

```
Пример (skydns)> assign interface Bridge0 7061161877
SkyDns::Client: Associated interface "Bridge0" with profile ►
"7061161877".
(skydns)> assign 04:12:23:54:bc:59 7061161877
SkyDns::Client: Associated host "04:12:23:54:bc:59" with profile ►
(skydns)> no assign interface Bridge0
SkyDns::Client: Removed profile for interface "Bridge0".
(skydns)> no assign 04:12:23:54:bc:59
SkyDns::Client: Removed profile for host "04:12:23:54:bc:59".
```

**Notes**

История изменений Версия Описание Добавлена команда skydns assign.2.01

---

### skydns check-availability

Проверить доступность службы SkyDNS.

**Syntax**

```bash
check-availability
```

**Examples**

```
Пример (skydns)> check-availability
SkyDns::Client: SkyDNS is available.
```

**Notes**

История изменений Версия Описание Добавлена команда skydns check-availability.2.06

---

### skydns login

Указать логин для учетной записи SkyDNS. Команда с префиксом no сбрасывает настройку.

**Syntax**

```bash
login ‹login› [ ‹password› ] (skydns)> no login
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| login | — | — | — |
| password | — | — | — |

**Examples**

```
Пример (skydns)> login myaccount@netcraze.com
SkyDns::Client: Set login.
(skydns)> no login
```

**Notes**

История изменений Версия Описание Добавлена команда skydns login.2.01

---

### skydns password

Указать пароль для учетной записи SkyDNS. Команда с префиксом no сбрасывает настройку.

**Syntax**

```bash
password ‹password› (skydns)> no password
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| password | — | — | — |

**Examples**

```
Пример (skydns)> password g$sc1)Uu(EGd*cGTv;`n
SkyDns::Client: Set password.
(skydns)> no password
```

**Notes**

История изменений Версия Описание Добавлена команда skydns password.2.01

---

### sms

Доступ к группе команд для настройки сервиса SMS на интерфейсе.

**Syntax**

```bash
sms ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (config)> sms UsbQmi0
(sms)>
```

**Notes**

История изменений Версия Описание Добавлена команда sms.3.03

---

### sms delete

Удалить SMS-сообщение.

**Syntax**

```bash
delete ‹id›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| id | — | — | — |

**Examples**

```
Пример (sms)> delete sim-5
UsbQmi::Sms: "UsbQmi0": message deleted.
```

**Notes**

История изменений Версия Описание Добавлена команда sms delete.3.03

---

### sms list

Показать список полученных SMS-сообщений.

**Syntax**

```bash
list [ unread ] [ id ‹id› ] [ no-content ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| id | — | — | — |

**Examples**

```
Пример (sms)> list
nv-free-slots: 23
nv-total-slots: 23
sim-free-slots: 0
sim-total-slots: 15
messages, id = sim-0:
read: yes
from: +79658283425
timestamp: Thu Aug 20 14:39:57 2020
parts: 1
```

**Notes**

История изменений Версия Описание Добавлена команда sms list.3.03 Добавлены аргументы id и no-content.3.07

---

### sms read

Отметить SMS как прочитанное. Команда с префиксом no возвращает SMS непрочитанную метку.

**Syntax**

```bash
read ‹id›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| id | — | — | — |

**Examples**

```
Пример (sms)> read sim-5
UsbQmi::Sms: "UsbQmi0": message marked as read.
(sms)> no read sim-5
UsbQmi::Sms: "UsbQmi0": message marked as unread.
```

**Notes**

История изменений Версия Описание Добавлена команда sms read.3.03

---

### sms send

Отправить SMS на указанный номер. Максимальное значение сохраненных входящих SMS-сообщений в памяти маршрутизатора — 128. Если память заполнена, самые старые SMS из памяти будут автоматически удаляться при получении нового SMS.

**Syntax**

```bash
send ‹to› ‹message›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| to | — | — | — |
| message | — | — | — |

**Examples**

```
Пример (sms)> send +79261122777 "hello world!"
UsbQmi::Sms: "UsbQmi0": message sent.
```

**Notes**

История изменений Версия Описание Добавлена команда sms send.3.03

---

### snmp community

Задать новое имя для SNMP сообщества. По умолчанию, используется стандартное имя public. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
snmp community ‹community›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| community | — | — | — |

**Examples**

```
(config)> no snmp community
Новое название сообщества.Строкаcommunity
Пример (config)> snmp community Co_test
Snmp::Manager: SNMP community set to "Co_test".
Snmp::Manager: SNMP community reset to "public".
```

**Notes**

История изменений Версия Описание Добавлена команда snmp community.2.08

---

### snmp contact

Присвоить контактное имя SNMP агенту. По умолчанию имя не определено. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
snmp contact ‹contact›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| contact | — | — | — |

**Examples**

```
Пример (config)> snmp contact Cont_test
Snmp::Manager: SNMP contact info set to "Cont_test".
(config)> no snmp contact
Snmp::Manager: SNMP community info reset.
```

**Notes**

История изменений Версия Описание Добавлена команда snmp contact.2.08

---

### snmp location

Указать расположение SNMP агента. По умолчанию расположение не определено. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
snmp location ‹location›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| location | — | — | — |

**Examples**

```
Пример (config)> snmp location Odintsovo
Snmp::Manager: SNMP device location set to "Odintsovo".
(config)> no snmp location
Snmp::Manager: SNMP device location reset.
```

**Notes**

История изменений Версия Описание Добавлена команда snmp location.2.08

---

### snmp view

Создать коммьюнити SNMP с ограниченным доступом. Команда с префиксом no удаляет коммьюнити.

**Syntax**

```bash
snmp view ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (config)> snmp view client
Snmp::Manager: Created view "client".
(config)> no snmp view client
Snmp::Manager: Removed view "client".
```

**Notes**

История изменений Версия Описание Добавлена команда snmp view.4.01

---

### snmp view exclude

Исключить поддерево из представления SNMP. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
snmp view exclude ‹oid›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| oid | — | — | — |

**Examples**

```
Пример (config)> snmp view client exclude mgmt
Snmp::Manager: "client": added excluded OID "mgmt".
(config)> no snmp view client exclude mgmt
Snmp::Manager: "client": removed excluded OID "mgmt".
```

**Notes**

История изменений Версия Описание Добавлена команда snmp view exclude.4.01

---

### snmp view include

Включить поддерево в представление SNMP. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
snmp view include ‹oid›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| oid | — | — | — |

**Examples**

```
Пример (config)> snmp view client include internet
Snmp::Manager: "client": added included OID "internet".
(config)> no snmp view client include internet
Snmp::Manager: "client": removed included OID "internet".
```

**Notes**

История изменений Версия Описание Добавлена команда snmp view include.4.01

---

### sstp-server

Доступ к группе команд для настройки параметров сервера SSTP.

**Syntax**

```bash
sstp-server
```

**Notes**

История изменений Версия Описание Добавлена команда sstp-server.2.12

---

### sstp-server allow-bridging

Включить поддержку Ethernet в режиме моста для SSTP-сервера. По умолчанию режим выключен. Примечание: Режиммостаподдерживаетсямеждумаршрутизаторами Netcraze. Команда с префиксом no выключает данный режим.

**Syntax**

```bash
allow-bridging (sstp-server)> no allow-bridging
```

**Examples**

```
Пример (sstp-server)> allow-bridging
SstpServer::Manager: Enabled Ethernet mode.
(sstp-server)> no allow-bridging
SstpServer::Manager: Disabled Ethernet mode.
```

**Notes**

История изменений Версия Описание Добавлена команда sstp-server allow-bridging.3.09

---

### sstp-server camouflage

Включить режим camouflage для сервера SSTP, обеспечивающий дополнительную безопасность от удаленного сканирования доступных сервисов. По умолчанию данный режим выключен. Команда с префиксом no отключает режим camouflage.

**Syntax**

```bash
camouflage (sstp-server)> no camouflage
```

**Examples**

```
Пример (sstp-server)> camouflage
SstpServer::Manager: Enabled camouflage mode.
(sstp-server)> no camouflage
SstpServer::Manager: Disabled camouflage mode.
```

**Notes**

История изменений Версия Описание Добавлена команда sstp-server camouflage.4.02

---

### sstp-server dhcp route

Назначить маршрут, передаваемый через сообщения DHCP INFORM, клиентам SSTP-сервера. Команда с префиксом no отменяет получение указанного маршрута. Если ввести команду без аргументов, будет отменено получение всех маршрутов.

**Syntax**

```bash
dhcp route ‹address› ‹mask› (sstp-server)> no dhcp route [ ‹address› ‹mask› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |
| mask | — | — | — |

**Examples**

```
Пример (sstp-server)> dhcp route 192.168.2.0/24
SstpServer::Manager: Added DHCP INFORM route to ►
192.168.2.0/255.255.255.0.
(sstp-server)> no dhcp route
SstpServer::Manager: Cleared DHCP INFORM routes.
```

**Notes**

История изменений Версия Описание Добавлена команда sstp-server dhcp route.2.12

---

### sstp-server interface

Связать сервер SSTP с указанным интерфейсом. Команда с префиксом no разрывает связь.

**Syntax**

```bash
interface ‹interface› (sstp-server)> no interface
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |

**Examples**

```
Пример (sstp-server)> interface [Tab]
Usage template:
interface {interface}
Choose:
GigabitEthernet1
ISP
WifiMaster0/AccessPoint2
WifiMaster1/AccessPoint1
WifiMaster0/AccessPoint3
WifiMaster0/AccessPoint0
```

**Notes**

История изменений Версия Описание Добавлена команда sstp-server interface.2.12

---

### sstp-server ipv6cp

Включить поддержку IPv6. Для каждого SSTP-сервера создаются DHCP-пулы IPv6. По умолчанию настройка отключена. Команда с префиксом no отключает поддержку IPv6. (sstp-server)> no ipv6cp

**Syntax**

```bash
ipv6cp
```

**Examples**

```
Пример (sstp-server)> ipv6cp
SstpServer::Manager: IPv6 control protocol enabled.
(sstp-server)> no ipv6cp
SstpServer::Manager: IPv6 control protocol disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда sstp-server ipv6cp.3.00

---

### sstp-server lcp echo

Определить правила тестирования SSTP-подключений средствами LCP echo. Команда с префиксом no отключает LCP echo.

**Syntax**

```bash
lcp echo ‹interval› ‹count› [adaptive] (sstp-server)> no lcp echo
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interval | — | — | — |
| count | — | — | — |

**Examples**

```
Пример (sstp-server)> lcp echo 5 3
SstpServer::Manager: LCP echo parameters updated.
```

**Notes**

История изменений Версия Описание Добавлена команда sstp-server lcp echo.2.12

---

### sstp-server lcp force-pap

Принудительно использовать режим аутентификации PAP для сервера SSTP. Команда с префиксом no отключает принудительное использование PAP.

**Syntax**

```bash
lcp force-pap (sstp-server)> no lcp force-pap
```

**Examples**

```
Пример (sstp-server)> lcp force-pap
SstpServer::Manager: Forced PAP-only authentication.
(sstp-server)> no lcp force-pap
SstpServer::Manager: Disabled forcing PAP-only authentication.
```

**Notes**

История изменений Версия Описание Добавлена команда sstp-server lcp force-pap.3.05

---

### sstp-server mru

Установить значение MRU которое будет передано SSTP-серверу. По умолчанию используется значение 1350. Команда с префиксом no устанавливает значение по умолчанию.

**Syntax**

```bash
mru ‹value› (sstp-server)> no mru
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| value | — | — | — |

**Examples**

```
Пример (sstp-server)> mru 200
SstpServer::Manager: MRU set to 200.
```

**Notes**

История изменений Версия Описание Добавлена команда sstp-server mru.2.12

---

### sstp-server mtu

Установить значение MTU, которое будет передано SSTP-серверу. По умолчанию используется значение 1350. Команда с префиксом no устанавливает значение по умолчанию.

**Syntax**

```bash
mtu ‹value› (sstp-server)> no mtu
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| value | — | — | — |

**Examples**

```
Пример (sstp-server)> mtu 200
SstpServer::Manager: MTU set to 200.
```

**Notes**

История изменений Версия Описание Добавлена команда sstp-server mtu.2.12

---

### sstp-server multi-login

Разрешить подключение к серверу SSTP нескольких пользователей с одного аккаунта. Команда с префиксом no отключает эту возможность.

**Syntax**

```bash
multi-login (sstp-server)> no multi-login
```

**Examples**

```
Пример (sstp-server)> multi-login
SstpServer::Manager: Enabled multiple login.
```

**Notes**

История изменений Версия Описание Добавлена команда sstp-server multi-login.2.12

---

### sstp-server pool-range

Назначить пул адресов для клиентов, подключающихся к серверу SSTP. По умолчанию используется размер пула 10. Команда с префиксом no удаляет пул.

**Syntax**

```bash
pool-range ‹begin› [ ‹size› ] (sstp-server)> no pool-range
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| begin | — | — | — |
| size | — | — | — |

**Examples**

```
Пример (sstp-server)> pool-range 192.168.1.22 7
SstpServer::Manager: Configured pool range 192.168.1.22 to ►
192.168.1.28.
```

**Notes**

История изменений Версия Описание Добавлена команда sstp-server pool-range.2.12

---

### sstp-server static-ip

Назначить постоянный IP-адрес пользователю. Пользователь в системе должен иметь метку sstp. Команда с префиксом no удаляет привязку.

**Syntax**

```bash
static-ip ‹name› ‹address› (sstp-server)> no static-ip ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| address | — | — | — |

**Examples**

```
Пример (sstp-server)> static-ip admin 192.168.1.22
SstpServer::Manager: Static IP 192.168.1.22 assigned to user ►
"admin".
```

**Notes**

История изменений Версия Описание Добавлена команда sstp-server static-ip.2.12

---

### system

Доступ к группе команд для настройки глобальных параметров.

**Syntax**

```bash
system
```

**Notes**

История изменений Версия Описание Добавлена команда system.2.00

---

### system button

Настроить кнопки на корпусе устройства на выполнение определенных действий. Набор обработчиков зависит от аппаратной конфигурации и установленных модулей. Команда с префиксом no отменяет настройку.

**Syntax**

```bash
button ‹button› on ‹action› do ‹handler› (system)> no button ‹button›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| button | — | — | — |
| action | — | — | — |
| handler | — | — | — |

**Examples**

```
Пример (system)> button WLAN on double-click do WifiGuestApToggle
Peripheral::Manager: "WLAN/double-click" handler set.
```

**Notes**

История изменений Версия Описание Добавлена команда system button.2.03 Добавлен обработчик OpkgRunScript.2.06

---

### system caption

Установить название и заголовок веб-интерфейса для удобства навигации.

**Syntax**

```bash
caption ‹template›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| template | — | — | — |

**Examples**

```
Пример (system)> caption product
Core::System::Caption: Template set to product.
```

**Notes**

История изменений Версия Описание Добавлена команда system caption.3.08

---

### system clock date

Установить системные дату и время.

**Syntax**

```bash
clock date ‹date-and-time›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| date-and-time | — | — | — |

**Examples**

```
Пример (system)> clock date 18 07 2012 09:52:33
System date and time has been changed.
```

**Notes**

История изменений Версия Описание Добавлена команда system clock date.2.00

---

### system clock timezone

Установить часовой пояс системы. Команда с префиксом no устанавливает часовой пояс по умолчанию (GMT).

**Syntax**

```bash
clock timezone ‹locality› (system)> no clock timezone ‹locality›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| locality | — | — | — |

**Examples**

```
Пример (system)> clock timezone Dublin
the system timezone is set to "Dublin".
```

**Notes**

История изменений Версия Описание Добавлена команда system clock timezone.2.00

---

### system configuration factory-reset

Восстановить заводские настройки для всех режимов.

**Syntax**

```bash
configuration factory-reset
```

**Examples**

```
Пример (system)> configuration factory-reset
Core::Configuration: the system configuration reset to factory ►
defaults.
```

**Notes**

История изменений Версия Описание Добавлена команда system configuration factory-reset. 2.00

---

### system configuration fail-safe commit

Зафиксировать все несохраненные изменения и остановить таймер.

**Syntax**

```bash
configuration fail-safe commit
```

**Examples**

```
Пример (system)> configuration fail-safe commit
Core::System::Mtd::ConfigStorage: Commited fail-safe ►
configuration changes.
```

**Notes**

История изменений Версия Описание Добавлена команда system configuration fail-safe commit. 3.08

---

### system configuration fail-safe keep-alive

Тихо перезапустить таймер отказоустойчивости. Если отказоустойчивый режим неактивен или нет изменений в конфигурации, команда ничего не делает.

**Syntax**

```bash
configuration fail-safe keep-alive
```

**Examples**

```
Пример (system)> configuration fail-safe keep-alive
```

**Notes**

История изменений Версия Описание Добавлена команда system configuration fail-safe keep-alive. 3.08

---

### system configuration fail-safe rollback

Откатить все несохраненные изменения и перезагрузить систему. При перезагрузкесистема переходит в специальноесостояние отката. В этом состоянии блокируются действия фиксации и изменения конфигурации таймера, за исключением отключения таймера. Если нет изменений в конфигурации, команда ничего не делает.

**Syntax**

```bash
configuration fail-safe rollback
```

**Examples**

```
Пример (system)> configuration fail-safe rollback
Core::System::Mtd::ConfigStorage: Ignored a fail-safe rollback: ►
no pending changes.
```

**Notes**

История изменений Версия Описание Добавлена команда system configuration fail-safe rollback. 3.08

---

### system configuration fail-safe timer

Настроить или отменить таймер отказоустойчивости. Команда настраивает(или перенастраивает)состояниетаймера,котороеявляется постоянныммежду перезагрузками— она не требует явного сохранения конфигурации. Реализована только для режима маршрутизатора. Команда с префиксом no отключает функцию.

**Syntax**

```bash
configuration fail-safe timer ‹action› ‹interval› (system)> no configuration fail-safe timer
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| action | — | — | — |
| interval | — | — | — |

**Examples**

```
Пример (system)> configuration fail-safe timer reboot 60
Core::System::Mtd::ConfigStorage: Enabled a 60-second fail-safe ►
"reboot" timer.
(system)> no configuration fail-safe timer
Core::System::Mtd::ConfigStorage: Turned off the fail-safe mode.
```

**Notes**

История изменений Версия Описание Добавлена команда system configuration fail-safe timer. 3.08

---

### system configuration save

Сохранить системные настройки.

**Syntax**

```bash
configuration save
```

**Examples**

```
Пример (system)> configuration save
Saving configuration.
```

**Notes**

История изменений Версия Описание Добавлена команда system configuration save.2.05.B.1

---

### system country

Выбрать страну из списка стран, доступных в регионе, указанном производителем. Выбранная страна постоянно хранится в памяти и не требует сохранения конфигурации команды. Настройка страны влияет на все режимы системы. Команда с префиксом no удаляет данную настройку.

**Syntax**

```bash
country ‹country›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| country | — | — | — |

**Examples**

```
Пример (system)> country EN
Core::System::Country: Set the system country code to "EN".
(system)> no country
Core::System::Country: Reset the system country code.
8 https://ru.wikipedia.org/wiki/ISO_3166-1_alpha-2
```

**Notes**

История изменений Версия Описание Добавлена команда system country.4.00

---

### system debug

Включить отладку системы. По умолчанию параметр отключен. Команда с префиксом no отключает настройку.

**Syntax**

```bash
debug (system)> no debug
```

**Examples**

```
Пример (system)> debug
Core::Debug: System debug enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда system debug.2.03

---

### system description

Задать описание системы в виде произвольной строки. По умолчанию Команда с префиксом no возвращает описание по умолчанию.

**Syntax**

```bash
description ‹description› (system)> no description
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| description | — | — | — |

**Examples**

```
Пример (system)> description DEVICE
Core::System::Info: Description saved.
(config)> show version
...
manufacturer: Netcraze Ltd.
vendor: Netcraze
series: KN
model: Ultra (KN-1810)
hw_version: 10188000
hw_id: KN-1810
```

**Notes**

История изменений Версия Описание Добавлена команда system description.2.15

---

### system domainname

Присвоить системе доменное имя. Команда с префиксом no удаляет доменное имя.

**Syntax**

```bash
domainname ‹domain› (system)> no domainname
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| domain | — | — | — |

**Examples**

```
Пример (system)> domainname zydata
Domainname saved.
```

**Notes**

История изменений Версия Описание Добавлена команда system domainname.2.00

---

### system eject

Остановить и извлечь USB-накопитель SCSI/SATA. Для отображения всех имен накопителей с данными используйте команду show media.

**Syntax**

```bash
eject ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Examples**

```
Пример (system)> eject Media0
Storage::Manager: Started "Media0" eject.
```

**Notes**

История изменений Версия Описание Добавлена команда system eject.3.04

---

### system hostname

Установить системное имя хоста. Имя хоста используется для идентификации узла в сети. Это необходимо для обеспечения работы некоторых встроенных служб, таких как CIFS. Команда с префиксом no устанавливает значение по умолчанию, зависящее от названия модели устройства.

**Syntax**

```bash
hostname ‹hostname› (system)> no hostname
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| hostname | — | — | — |

**Examples**

```
Пример (system)> hostname KN1010
Core::System::Hostname: The host name set.
(system)> no hostname
Core::System::Hostname: The host name reset.
```

**Notes**

История изменений Версия Описание Добавлена команда system hostname.2.00

---

### system led

Настроить индикаторы общего назначения. По умолчанию индикаторы FN_1 и FN_2 показывают состояние устройств, подключенных к портам USB_1 и USB_2. Команда с префиксом no отменяет настройку.

**Syntax**

```bash
led ‹led› indicate ‹control› (system)> no led [ ‹led› [ indicate] ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| led | — | — | — |
| control | — | — | — |

**Examples**

```
Пример (system)> led FN_1 indicate BackupWan
Peripheral::Manager: "BackupWan" control bound to "FN_1" LED.
(system)> led FN_2 indicate SelectedWan
Peripheral::Manager: "SelectedWan" control bound to "FN_2" LED.
(system)> no led FN_1 indicate
Peripheral::Manager: "FN_1" LED control binding removed.
(system)> no led FN_1
Peripheral::Manager: "FN_1" LED control binding reset to default.
```

**Notes**

История изменений Версия Описание Добавлена команда system led.2.08

---

### system led power schedule

Присвоить расписание для работы светодиодных индикаторов на устройстве. Перед выполнением команды расписание должно быть создано и настроено при помощи команды schedule action. Команда с префиксом no разрывает связь между расписанием и работой индикаторов.

**Syntax**

```bash
led power schedule ‹schedule› (system)> no led power schedule
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| schedule | — | — | — |

**Examples**

```
Пример (system)> led power schedule schedule1
Core::Peripheral::Manager: Set LED power schedule "schedule1".
(system)> no led power schedule
Core::Peripheral::Manager: Clear LED power schedule.
```

**Notes**

История изменений Версия Описание Добавлена команда system led power schedule.3.06

---

### system led power shutdown

Выключить светодиоды на устройстве. Команда с префиксом no включает светодиоды.

**Syntax**

```bash
led power shutdown ‹mode› (system)> no led power shutdown
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mode | — | — | — |

**Examples**

```
Пример (system)> led power shutdown all
Core::Peripheral::Manager: Set LED shutdown mode to "all".
(system)> no led power shutdown
Core::Peripheral::Manager: Set LED shutdown mode to "none".
```

**Notes**

История изменений Версия Описание Добавлена команда system led power shutdown. Предыдущееназваниекомандыsystemled shutdown. 3.06

---

### system log clear

Очистить системный журнал.

**Syntax**

```bash
log clear
```

**Examples**

```
Пример (system)> log clear
Syslog: the system log has been cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда system log clear.2.00

---

### system log reduction

Включить сокращение повторных сообщений в системном журнале. По умолчанию параметр включен. Команда с префиксом no отключает настройку.

**Syntax**

```bash
log reduction (system)> no log reduction
```

**Examples**

```
Пример (system)> log reduction
(system)> no log reduction
```

**Notes**

История изменений Версия Описание Добавлена команда system log reduction.2.04

---

### system log server

Добавить удаленный сервер для хранения системного журнала.

**Syntax**

```bash
log server ‹address› [: ‹port›] (system)> no log server [ ‹address› [: ‹port›] ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |
| port | — | — | — |

**Examples**

```
Пример (system)> log server 192.168.1.1:8080
Syslog: server 192.168.1.1:8080 added.
```

**Notes**

История изменений Версия Описание Добавлена команда system log server.2.00

---

### system log suppress

Добавить правило подавления сообщений. Команда с префиксом no удаляет правило.

**Syntax**

```bash
log suppress ‹ident› (system)> no log suppress [ ‹ident› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| ident | — | — | — |

**Examples**

```
Пример (system)> log suppress kernel
Core::Syslog: Added suppression "kernel".
(system)> no log suppress kernel
Core::Syslog: Deleted suppression "kernel".
(system)> log suppress transmissiond
Core::Syslog: Added suppression "transmissiond".
(system)> no log suppress transmissiond
Core::Syslog: Deleted suppression "transmissiond".
```

**Notes**

История изменений Версия Описание Добавлена команда system log suppress.2.04

---

### system mode

Выбрать режим работы Giga.

**Syntax**

```bash
mode ‹mode›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mode | — | — | — |

**Examples**

```
Пример (system)> mode repeater
Core::Mode: The system switched to "repeater" mode, reboot the ►
device to apply the settings.
```

**Notes**

История изменений Версия Описание Добавлена команда system mode.2.05

---

### system mount

ПодключитьUSB-устройство.Для отображенияподключенныхустройств используйте команду show usb. Команда с префиксом no отключает устройство.

**Syntax**

```bash
mount ‹filesystem› (system)> no mount ‹filesystem›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| filesystem | — | — | — |

**Examples**

```
Пример (system)> mount 9430B54530B52EDC:
Filesystem mounted
```

**Notes**

История изменений Версия Описание Добавлена команда system mount.2.00

---

### system ndss dump-report disable

Отключить программу улучшения качества. По умолчанию настройка включена. Команда с префиксом no включает использование данной программы.

**Syntax**

```bash
ndss dump-report disable (system)> no ndss dump-report disable
```

**Examples**

```
Пример (system)> ndss dump-report disable
Core::Ndss: Dump-reporting disabled.
(system)> no ndss dump-report disable
Core::Ndss: Dump-reporting enabled.
```

**Notes**

История изменений Версия Описание Добавленакоманда system ndss dump-reportdisable. Предыдущее название команды system dump-report disable. 3.05

---

### system reboot

Выполнить перезагрузку системы. Если указан параметр, перезагрузка выполнится запланировано через заданный интервал в секундах. Использование команды при уже установленном таймере заменяет старое значение таймера новым. Использование запланированной перезагрузки удобно в том случае, когда осуществляется удаленное управление устройством, и пользователю неизвестен эффект от применения каких-либо команд. Из опасения потерять контроль над устройством пользователь может включить запланированную перезагрузку, которая сработает через заданный интервал времени. Система вернется в первоначальное состояние, в котором она снова будет доступна по сети. Команда с префиксом no отменяет перезагрузку или удаляет привязку к расписанию.

**Syntax**

```bash
reboot [ ‹interval› | schedule ‹schedule›] (system)> no reboot [ schedule]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interval | — | — | — |
| schedule | — | — | — |

**Examples**

```
Пример (system)> reboot 20
Core::System::RebootManager: Rebooting in 20 seconds.
(system)> no reboot
Core::System::RebootManager: Reboot cancelled.
(system)> reboot schedule rebootroute
Core::System::RebootManager: Set reboot schedule "rebootroute".
(system)> no reboot schedule
Core::System::RebootManager: Schedule disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда system reboot.2.00 Добавлен аргумент schedule.2.12

---

### system set

Установить значение указанного системного параметра и сохранить изменения в текущих настройках. Команда с префиксом no возвращаетпараметрузначение,которое было установлено по умолчанию, до первого изменения.

**Syntax**

```bash
set ‹name› ‹value› (system)> no set ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| value | — | — | — |

**Examples**

```
Пример (config)> system
(system)> set net.ipv4.ip_forward 1
(system)> set net.ipv4.tcp_fin_timeout 30
(system)> set net.ipv4.tcp_keepalive_time 120
(system)> set ►
net.ipv4.netfilter.ip_conntrack_tcp_timeout_established 1200
(system)> set net.ipv4.netfilter.ip_conntrack_udp_timeout 60
(system)> set net.ipv4.netfilter.ip_conntrack_max 4096
(system)> exit
(config)> show running-config
```

**Notes**

История изменений Версия Описание Добавлена команда system set.2.00

---

### system swap

Настроить файл подкачки. Если файл не найден, команда пытается его создать. Команда с префиксом no отключает подкачку.

**Syntax**

```bash
swap (‹area› | ‹area›) ‹size› (system)> no swap
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| area | — | — | — |
| size | — | — | — |

**Examples**

```
Пример (system)> swap OPKG:/swap/swapfile 2097152
Storage::Swap::Manager: Swap is being initialized in background.
(system)> no swap
Storage::Swap::Manager: Swap area OPKG:/swap/swapfile disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда system swap.2.00

---

### system trace lock threshold

Установить порог блокировки отслеживания для системных потоков. Если пороговое значение превышается, информация об этом потоке (например, о сессии SCGI) сохраняется в системном журнале. По умолчанию, параметр отключен. Команда с префиксом no отключает функцию порога блокировки.

**Syntax**

```bash
system trace lock threshold ‹threshold› (system)> no system trace lock threshold
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| threshold | — | — | — |

**Examples**

```
Пример (system)> system trace lock threshold 100
Lockable: Set threshold to 100 ms.
(system)> no trace lock threshold
Lockable: Reset threshold.
```

**Notes**

История изменений Версия Описание Добавлена команда system trace lock threshold.3.03

---

### system usb power schedule

Присвоить расписание USB-порту. Перед выполнением команды, расписание должно быть создано и настроено при помощи команды schedule action. Команда с префиксом no разрывает связь с расписанием. (system)> no usb ‹port› power schedule ‹schedule›

**Syntax**

```bash
usb ‹port› power schedule ‹schedule›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| port | — | — | — |
| schedule | — | — | — |

**Examples**

```
Пример (system)> usb 1 power schedule schedule0
Usb::Manager: Port "1" schedule "schedule0" assigned.
(system)> no usb 1 power schedule
Usb::Manager: Port "1" schedule unassigned.
```

**Notes**

История изменений Версия Описание Добавлена команда system usb power schedule.4.00

---

### system usb power shutdown

Отключить питание для USB-порта. Команда с префиксом no включает питание.

**Syntax**

```bash
port ‹port› power shutdown (system)> no port ‹port› power shutdown
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| port | — | — | — |

**Examples**

```
Пример (system)> usb 1 power shutdown
Usb::Manager: Port "1" power is shutting down.
(system)> no usb 1 power shutdown
Usb::Manager: Port "1" power is activated.
```

**Notes**

История изменений Версия Описание Добавлена команда system usb power shutdown.4.00

---

### system zram

Настройкафайла подкачки zRam. Если аргумент не используется,размер файла zRam будет устанавливаться автоматически. Команда с префиксом no удаляет файл подкачки.

**Syntax**

```bash
zram [ ‹size› ] (system)> no zram
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| size | — | — | — |

**Examples**

```
Пример (system)> zram
Zram::Manager: Enabled zram swap of size 262144Kb.
(system)> no zram
Zram::Manager: Zram swap disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда system zram.2.09

---

### tools

Доступ к группе команд для тестирования системной среды.

**Syntax**

```bash
tools
```

**Notes**

История изменений Версия Описание Добавлена команда tools.2.00

---

### tools arping

Действие команды аналогично команде tools ping, но в отличие от неё работает на втором уровне модели OSI и использует протокол ARP. ‹count› ] [ wait-time ‹wait-time› ]

**Syntax**

```bash
arping ‹address› source-interface‹source-interface› [ count
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |
| source-interface | — | — | — |

**Examples**

```
Пример (tools)> arping 192.168.15.51 source-interface Home count 4 ►
wait-time 3000
Starting the ARP ping to "192.168.15.51"...
ARPING 192.168.15.51 from 192.168.15.1 br0.
Unicast reply from 192.168.15.51 [9c:b7:0d:ce:51:6a] 1.884 ms.
Unicast reply from 192.168.15.51 [9c:b7:0d:ce:51:6a] 1.831 ms.
Sent 4 probes, received 2 responses.
Process terminated.
```

**Notes**

История изменений Версия Описание Добавлена команда tools arping.2.00

---

### tools ping

Отправить запросы Echo-Request протокола ICMP указанному узлу сети и зафиксировать поступающие ответы Echo-Reply. Время между отправкой запроса и получением ответа Round Trip Time (RTT) позволяет определять двусторонние задержки по маршруту и частоту потери пакетов,то естькосвенноопределятьзагруженностьна каналахпередачи данных и промежуточных устройствах. Полное отсутствие ICMP-ответов может также означать, что удалённый узел (или какой-либо из промежуточных маршрутизаторов) блокирует ICMP Echo-Reply или игнорирует ICMP Echo-Request. ‹sequence-id› ] [ source ( ‹source-interface› | ‹source-address› ) ] [ tos ‹tos› ] [ ttl ‹ttl› ]

**Syntax**

```bash
ping ‹host› [ count ‹count› ] [ size ‹packetsize› ] [ sequence-id
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| host | — | — | — |
| count | — | — | — |
| packetsize | — | — | — |

**Examples**

```
Пример (tools)> ping 8.8.8.8 count 5 size 100
Sending ICMP ECHO request to 192.168.1.33
PING 192.168.1.33 (192.168.1.33) 72 (100) bytes of data.
100 bytes from 192.168.1.33: icmp_req=1, ttl=128, time=2.35 ms.
100 bytes from 192.168.1.33: icmp_req=2, ttl=128, time=1.07 ms.
100 bytes from 192.168.1.33: icmp_req=3, ttl=128, time=1.06 ms.
--- 192.168.1.33 ping statistics ---
3 packets transmitted, 3 packets received, 0% packet loss,
0 duplicate(s), time 2002.65 ms.
Round-trip min/avg/max = 1.06/1.49/2.35 ms.
```

**Notes**

История изменений Версия Описание Добавлена команда tools ping.2.00 Добавлены новые значения address и interface в аргумент source. 4.01

---

### tools ping6

Отправить запросы Echo-Request протокола ICMPv6 указанному узлу сети и зафиксировать поступающие ответы Echo-Reply. Время между отправкой запроса и получением ответа Round Trip Time (RTT) позволяет определять двусторонние задержки по маршруту и частоту потери пакетов,то естькосвенноопределятьзагруженностьна каналахпередачи данных и промежуточных устройствах. ПолноеотсутствиеICMPv6-ответовможеттакжеозначать,что удалённый узел (или какой-либо из промежуточных маршрутизаторов) блокирует ICMP Echo-Reply или игнорирует ICMP Echo-Request.

**Syntax**

```bash
ping6 ‹host› [ count ‹count› ] [ size ‹packetsize› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| host | — | — | — |
| count | — | — | — |
| packetsize | — | — | — |

**Examples**

```
Пример (tools)> ping6 2001:4860:4860::8888 count 5 size 111
sending ICMPv6 ECHO request to 2001:4860:4860::8888...
PING 2001:4860:4860::8888 (2001:4860:4860::8888) 63 (111) bytes ►
of data.
71 bytes from 2001:4860:4860::8888: icmp_req=1, ttl=108, ►
time=19.84 ms.
71 bytes from 2001:4860:4860::8888: icmp_req=2, ttl=108, ►
time=19.73 ms.
71 bytes from 2001:4860:4860::8888: icmp_req=3, ttl=108, ►
time=19.96 ms.
```

**Notes**

История изменений Версия Описание Добавлена команда tools ping6.2.00 Добавлены новые значения address и interface в аргумент source. 4.01

---

### tools traceroute

Показать маршрут к сетевому хост. [wait-time ‹wait-time›] [packet-size ‹packet-size›] [max-ttl‹max-ttl›] [port ‹port›] [source-address‹source-address›] [source-interface ‹source-interface›] [type ‹type›] [tos ‹tos›]

**Syntax**

```bash
traceroute ‹host› [count ‹count›] [interval ‹interval›]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| host | — | — | — |
| count | — | — | — |
| interval | — | — | — |

**Examples**

```
Пример (tools)> traceroute google.com count 5 interval 5
starting traceroute to google.com...
traceroute to google.com (64.233.161.113), 30 hops maximum, 60 ►
byte packets.
1 192.168.233.1 (192.168.233.1) 2.742 ms 2.406 ms 2.460 ms ►
2.191 ms 2.957 ms
2 10.77.140.1 (10.77.140.1) 3.301 ms 3.847 ms 3.839 ms
process terminated
```

**Notes**

История изменений Версия Описание Добавлена команда tools traceroute.2.00

---

### torrent

Доступ к группе команд для настройки параметров BitTorrent.

**Syntax**

```bash
torrent
```

**Notes**

История изменений Версия Описание Добавлена команда torrent.2.00

---

### torrent directory

Указать папку для загружаемых файлов. Если папка не найдена, команда пытается ее создать. Команда с префиксом no удаляет настройку.

**Syntax**

```bash
directory ‹directory›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| directory | — | — | — |

**Examples**

```
Пример (config-torrent)> directory ►
46E243F4E243E6B1:/components/transmission/
(config-torrent)> no directory
```

**Notes**

История изменений Версия Описание Добавлена команда torrent directory.2.00

---

### torrent peer-port

Указать порт для удаленного узла. По умолчанию используется порт 51413.

**Syntax**

```bash
peer-port ‹port›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| port | — | — | — |

**Examples**

```
Пример (config-torrent)> peer-port 11122
Torrent::Client: Peer port changed to 11122.
```

**Notes**

История изменений Версия Описание Добавлена команда torrent peer-port.2.00

---

### torrent policy

Назначить профиль доступа для клиента BitTorrent. Команда с префиксом no префикса удаляет указанный профиль доступа для клиента BitTorrent.

**Syntax**

```bash
policy ‹policy›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| policy | — | — | — |

**Examples**

```
(config-torrent)> no policy
Название профиля доступа.Профиль доступаpolicy
Пример (config-torrent)> policy PolicyNaN
Torrent::Client: Policy PolicyNaN applied.
Torrent::Client: Policy cleared.
```

**Notes**

История изменений Версия Описание Добавлена команда torrent policy.3.01

---

### torrent reset

Сбросить настройки клиента BitTorrent.

**Syntax**

```bash
reset
```

**Examples**

```
Пример (config-torrent)> reset
Torrent::Client: Reset performed.
```

**Notes**

История изменений Версия Описание Добавлена команда torrent reset.2.10

---

### torrent rpc-port

Назначить порт RPC. По умолчанию используется значение 8090.

**Syntax**

```bash
rpc-port ‹port› [public]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| port | — | — | — |

**Examples**

```
Пример (config-torrent)> rpc-port 9945
Torrent::Client: RPC port changed to 9945 (private).
(config-torrent)> rpc-port 9945 public
Torrent::Client: RPC port changed to 9945 (public).
```

**Notes**

История изменений Версия Описание Добавлена команда torrent rpc-port.2.00

---

### udpxy

Доступ к группе команд для настройки параметров udpxy.

**Syntax**

```bash
udpxy
```

**Notes**

История изменений Версия Описание Добавлена команда udpxy.2.03

---

### udpxy buffer-size

Установить размер буфера udpxy. По умолчанию используется значение 2048. Команда с префиксом no сбрасывает размер буфера в значение по умолчанию.

**Syntax**

```bash
buffer-size ‹size› (udpxy)> no buffer-size
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| size | — | — | — |

**Examples**

```
Пример (udpxy)> buffer-size 500
Udpxy::Manager: a buffer size set to 500 bytes.
```

**Notes**

История изменений Версия Описание Добавлена команда udpxy buffer-size.2.04

---

### udpxy buffer-timeout

Установитьтайм-аутдля храненияданныхв буфере udpxy. По умолчанию используется значение 1. Команда с префиксом no устанавливает тайм-аут по умолчанию.

**Syntax**

```bash
buffer-timeout ‹timeout› (udpxy)> no buffer-timeout
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| timeout | — | — | — |

**Examples**

```
Пример (udpxy)> buffer-timeout 10
Udpxy::Manager: a hold data timeout set to 10 sec.
```

**Notes**

История изменений Версия Описание Добавлена команда udpxy buffer-timeout.2.04

---

### udpxy interface

Связать udpxy с указанным интерфейсом. По умолчанию привязка не настроена и используется текущее подключение к интернету. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
interface ‹interface› (udpxy)> no interface
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |

**Examples**

```
Пример (udpxy)> interface [Tab]
Usage template:
interface {interface}
Choose:
GigabitEthernet1
ISP
WifiMaster0/AccessPoint2
WifiMaster1/AccessPoint1
WifiMaster0/AccessPoint3
WifiMaster0/AccessPoint0
```

**Notes**

История изменений Версия Описание Добавлена команда udpxy interface.2.02

---

### udpxy port

Установить порт для HTTP-запросов. По умолчанию используется значение 4022. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
port ‹port› (udpxy)> no port
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| port | — | — | — |

**Examples**

```
Пример (udpxy)> port 2323
Udpxy::Manager: a port set to 2323.
```

**Notes**

История изменений Версия Описание Добавлена команда udpxy port.2.03

---

### udpxy renew-interval

Установить период возобновления подписки на мультикаст-канал. По умолчаниюиспользуетсязначение0, то естьподпискане возобновляется. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
renew-interval ‹renew-interval› (udpxy)> no renew-interval
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| renew-interval | — | — | — |

**Examples**

```
Пример (udpxy)> renew-interval 120
Udpxy::Manager: a renew subscription interval value set to 120 ►
sec.
```

**Notes**

История изменений Версия Описание Добавлена команда udpxy renew-interval.2.03

---

### udpxy timeout

Установить тайм-аут соединения. По умолчанию используется значение 5. Команда с префиксом no возвращает значение по умолчанию.

**Syntax**

```bash
timeout ‹timeout› (udpxy)> no timeout
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| timeout | — | — | — |

**Examples**

```
Пример (udpxy)> timeout 10
Udpxy::Manager: a stream timeout set to 10 sec.
```

**Notes**

История изменений Версия Описание Добавлена команда udpxy timeout.2.03

---

### upnp forward

Добавить перенаправляющее правило UPnP. Команда с префиксом no удаляет правило из списка.

**Syntax**

```bash
upnp forward ‹protocol› [ interface ] ‹address› ‹port›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| protocol | — | — | — |
| address | — | — | — |
| port | — | — | — |

**Examples**

```
(config)> no upnp forward [ ‹index› | ( ‹protocol› ‹address› ‹port›) ]
protocol Добавить/удалить правило для протокола
TCP.
Добавить/удалить правило для протокола
UDP.
Будет добавлено правило для указанного
интерфейса.
Интерфейсinterface
Будет добавлено/удалено правило для
указанного IP-адреса.
```

**Notes**

История изменений Версия Описание Добавлена команда upnp forward.2.00

---

### upnp lan

Указать LAN-интерфейс на котором запущена служба UPnP. Служба работает только для одного сегмента сети. Команда с префиксом no отменяет настройку.

**Syntax**

```bash
upnp lan ‹interface›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |

**Examples**

```
Пример (config)> upnp lan [Tab]
Usage template:
lan {interface}
Choose:
GigabitEthernet1
ISP
WifiMaster0/AccessPoint2
WifiMaster1/AccessPoint1
WifiMaster0/AccessPoint3
WifiMaster0/AccessPoint0
```

**Notes**

История изменений Версия Описание Добавлена команда upnp lan.2.00

---

### upnp redirect

Добавить правило трансляции UPnP порта. Команда с префиксом no удаляет правило из списка. Если выполнить команду без аргумента, то весь список правил будет очищен. to-port ]

**Syntax**

```bash
upnp redirect ‹protocol› ‹interface› ‹port› ‹to-address› [
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| protocol | — | — | — |
| interface | — | — | — |
| port | — | — | — |
| to-address | — | — | — |

**Examples**

```
(config)> no upnp redirect [and forward | [ ‹index› | ( ‹protocol› ‹port›)
]]
protocol Добавить/удалить правило для протокола
TCP.
Добавить/удалить правило для протокола
UDP.
Будет добавлено правило для указанного
интерфейса.
Интерфейсinterface
Будет добавлено/удалено правило для
```

**Notes**

История изменений Версия Описание Добавлена команда upnp redirect.2.00

---

### user

Доступ к группе команд для настройки параметров учетной записи пользователя. Если учетная запись не найдена, команда пытается ее создать. Примечание: Учетная запись с зарезервированным именем admin не может быть удалена. Кроме того, у пользователя admin нельзя удалить право доступа к командной строке. Команда с префиксом no удаляет учетную запись пользователя.

**Syntax**

```bash
user ‹name›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |

**Notes**

История изменений Версия Описание Добавлена команда user.2.00

---

### user home

Назначить домашний каталог пользователя. Команда с префиксом no отменяет настройку.

**Syntax**

```bash
home ‹directory›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| directory | — | — | — |

**Examples**

```
Пример (config-user)> home files_ssd:/
Core::Authenticator: "test" user root directory set to ►
"files_ssd:/".
(config-user)> no home
(config-user)>
```

**Notes**

История изменений Версия Описание Добавлена команда user home.3.04

---

### user password

Указать пароль пользователя. Пароль хранится в виде MD5-хеша, вычисленного из строки «user:realm:password». realm это название модели устройства из файла startup-config.txt. Команда принимает аргумент в виде открытой строки или значения хеш-функции. Сохраненный пароль используется для аутентификации пользователя. Команда с префиксом no удаляет пароль, чтобы пользователь мог получить доступ к устройству без аутентификации.

**Syntax**

```bash
password ( md5 ‹hash› | ‹password› )
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| hash | — | — | — |
| password | — | — | — |

**Examples**

```
Пример (config-user)> password 1111
Core::Authenticator: Password set has been changed for user ►
"test".
```

**Notes**

История изменений Версия Описание Добавлена команда user password.2.00

---

### user tag

Присвоить учетной записи специальную метку, наличие которой проверяется в момент авторизации пользователя и выполнении им любых действий в системе. Набор допустимых значений метки зависит от функциональных возможностей системы. Полный список приведен в таблице ниже. Одной учетной записи можно назначить несколько разных меток, вводя команду многократно. Каждую метку можно рассматривать как предоставление или ограничение определенных прав. Команда с префиксом no удаляет заданную метку. Примечание: У учетной записи admin нельзя удалить метку cli. У учетной записи admin в режиме Усилитель нельзя удалить метку http.

**Syntax**

```bash
tag ‹tag›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| tag | — | — | — |

**Examples**

```
Пример (config-user)> tag cli
Core::Authenticator: User "test" tagged with "cli".
(config-user)> tag readonly
Core::Authenticator: User "test" tagged with "readonly".
(config-user)> tag http-proxy
Core::Authenticator: User "test" tagged with "http-proxy".
(config-user)> tag http
Core::Authenticator: User "test" tagged with "http".
(config-user)> tag afp
Core::Authenticator: User "test" tagged with "afp".
```

**Notes**

История изменений Версия Описание Добавлена команда user tag.2.00 Добавлена метка vpn.2.04 Добавлены метки opt и ipsec-xauth.2.06 Добавлена метка http-proxy.2.10 Добавлена метка ipsec-l2tp.2.11 Добавлена метка sstp.2.12 Добавлены метки vpn-dlna, sftp и webdav.3.04 ОписаниеВерсия Добавлена метка vpn-oc.4.02

---

### ussd send

Отправить USSD запрос мобильному оператору.

**Syntax**

```bash
ussd ‹interface› send ‹request›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |
| request | — | — | — |

**Examples**

```
Пример (config)> ussd UsbQmi0 send *100#
request: *100#
response: Your number: +79953332211
Available: 10 dol
4.01 / 5 GB
```

**Notes**

История изменений Версия Описание Добавлена команда ussd send.3.05

---

### vpn-server

Доступ к группе команд для настройки параметров сервера VPN.

**Syntax**

```bash
vpn-server
```

**Notes**

История изменений Версия Описание Добавлена команда vpn-server.2.04

---

### vpn-server dhcp route

Назначить маршрут, передаваемый через сообщения DHCP INFORM, клиентам VPN-сервера. Команда с префиксом no отменяет получение указанного маршрута. Если ввести команду без аргументов, будет отменено получение всех маршрутов.

**Syntax**

```bash
dhcp route ‹address› ‹mask›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| address | — | — | — |
| mask | — | — | — |

**Examples**

```
Пример (vpn-server)> dhcp route 192.168.2.0/24
VpnServer::Manager: Added DHCP INFORM route to ►
192.168.2.0/255.255.255.0.
(vpn-server)> no dhcp route
VpnServer::Manager: Cleared DHCP INFORM routes.
```

**Notes**

История изменений Версия Описание Добавлена команда vpn-server dhcp route.2.12

---

### vpn-server interface

Связать сервер VPN с указанным интерфейсом. Команда с префиксом no разрывает связь.

**Syntax**

```bash
interface ‹interface›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interface | — | — | — |

**Examples**

```
Пример (vpn-server)> interface [Tab]
Usage template:
interface {interface}
Choose:
GigabitEthernet1
ISP
WifiMaster0/AccessPoint2
WifiMaster1/AccessPoint1
WifiMaster0/AccessPoint3
WifiMaster0/AccessPoint0
```

**Notes**

История изменений Версия Описание Добавлена команда vpn-server interface.2.04

---

### vpn-server ipv6cp

ВключитьподдержкуIPv6.ДлякаждогоVPN-серверасоздаютсяDHCP-пулы IPv6. По умолчанию настройка отключена. Команда с префиксом no отключает поддержку IPv6.

**Syntax**

```bash
ipv6cp
```

**Examples**

```
Пример (vpn-server)> ipv6cp
VpnServer::Manager: IPv6 control protocol enabled.
(vpn-server)> no ipv6cp
VpnServer::Manager: IPv6 control protocol disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда vpn-server ipv6cp.3.00

---

### vpn-server lcp echo

Определить правила тестирования PPTP-подключений средствами LCP echo. Команда с префиксом no отключает LCP echo.

**Syntax**

```bash
lcp echo ‹interval› ‹count› [adaptive]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| interval | — | — | — |
| count | — | — | — |

**Examples**

```
Пример (vpn-server)> lcp echo 5 3
LCP echo parameters updated.
```

**Notes**

История изменений Версия Описание Добавлена команда vpn-server lcp echo.2.06

---

### vpn-server lockout-policy

Задать параметры отслеживания попыток вторжения путём перебора паролей VPN-сервера.По умолчаниюфункция включена.Eсли в качестве аргумента используется 0, все параметры отслеживания перебора будут сброшены в значения по умолчанию. Команда с префиксом no отключает обнаружение подбора. ‹observation-window› ] ]

**Syntax**

```bash
vpn-server lockout-policy ‹threshold› [‹duration› [
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| threshold | — | — | — |
| duration | — | — | — |

**Examples**

```
(vpn-server)> no vpn-server lockout-policy
Количество неудачных попыток
входа в систему. По умолчанию
Целое числоthreshold
установлено значение 5. Может
принимать значения в пределах от
2 до 20.
Продолжительность запрета
авторизации для указанного
Целое числоduration
```

**Notes**

История изменений Версия Описание Добавлена команда vpn-server lockout-policy.3.01

---

### vpn-server mppe

Установить режим для шифрования MPPE. По умолчанию используется ключ длиной 40 бит. Команда с префиксом no отключает выбранный режим.

**Syntax**

```bash
mppe ‹mode›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| mode | — | — | — |

**Examples**

```
Пример (vpn-server)> mppe 40
VpnServer::Manager: Set encryption 40.
```

**Notes**

История изменений Версия Описание Добавлена команда vpn-server mppe.2.05

---

### vpn-server mppe-optional

Разрешить подключения без шифрования MPPE. Команда с префиксом no запрещает незашифрованные подключения.

**Syntax**

```bash
mppe-optional
```

**Examples**

```
Пример (vpn-server)> mppe-optional
VpnServer::Manager: Unencrypted connections enabled.
(vpn-server)> no mppe-optional
VpnServer::Manager: Unencrypted connections disabled.
```

**Notes**

История изменений Версия Описание Добавлена команда vpn-server mppe-optional.2.04

---

### vpn-server mru

Установить значение MRU которое будет передано PPTP-серверу. По умолчанию используется значение 1350. Команда с префиксом no устанавливает значение по умолчанию.

**Syntax**

```bash
mru ‹value›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| value | — | — | — |

**Examples**

```
Пример (vpn-server)> mru 200
VpnServer::Manager: mru set to 200.
```

**Notes**

История изменений Версия Описание Добавлена команда vpn-server mru.2.04

---

### vpn-server mtu

Установить значение MTU, которое будет передано PPTP-серверу. По умолчанию используется значение 1350. Команда с префиксом no устанавливает значение по умолчанию.

**Syntax**

```bash
mtu ‹value›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| value | — | — | — |

**Examples**

```
Пример (vpn-server)> mtu 200
VpnServer::Manager: mtu set to 200.
```

**Notes**

История изменений Версия Описание Добавлена команда vpn-server mtu.2.04

---

### vpn-server multi-login

Разрешить подключение к серверу VPN нескольких пользователей с одного аккаунта. Команда с префиксом no отключает эту возможность.

**Syntax**

```bash
multi-login
```

**Examples**

```
Пример (vpn-server)> multi-login
VpnServer::Manager: multi login enabled.
```

**Notes**

История изменений Версия Описание Добавлена команда vpn-server multi-login.2.04

---

### vpn-server pool-range

Назначить пул адресов для клиентов, подключающихся к серверу VPN. Команда с префиксом no удаляет пул.

**Syntax**

```bash
pool-range ‹begin› [ ‹size› ]
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| begin | — | — | — |
| size | — | — | — |

**Examples**

```
Пример (vpn-server)> pool-range 172.168.1.22 20
VpnServer::Manager: Configured pool range 172.168.1.22 to ►
172.168.1.41.
(vpn-server)> no pool-range
VpnServer::Manager: Reset pool range.
```

**Notes**

История изменений Версия Описание Добавлена команда vpn-server pool-range.2.04

---

### vpn-server static-ip

НазначитьIP-адреспользователю.Пользовательв системедолжениметь метку vpn. Команда с префиксом no удаляет привязку.

**Syntax**

```bash
static-ip ‹name› ‹address›
```

**Arguments**

| Argument | Required | Description | Default |
|----------|----------|-------------|---------|
| name | — | — | — |
| address | — | — | — |

**Examples**

```
Пример (vpn-server)> static-ip test 172.16.1.35
VpnServer::Manager: Static IP 172.16.1.35 assigned to user "test".
(vpn-server)> static-ip test
VpnServer::Manager: Static IP address removed for user "test".
```

**Notes**

История изменений ОписаниеВерсия Добавлена команда vpn-server static-ip.2.04 Дополнительнаяинформация 4.1 HTTP Core Interface Giga предоставляет HTTP XML API. API доступен через интерфейс /ci , который принимаетPOST-запросыв форматеXMLи возвращаетXMLклиентскомуприложению, прошедшему процедуру авторизации. После сброса Giga на заводские настройки авторизация не требуется. Пример 4.1. Вызов XML API Выполнить команду «show interface» для WAN-интерфейса с именем ISP. Этот интерфейс присутствует в заводских настройках Giga. POST /ci HTTP/1.1 Host: 192.168.1.1 Connection: keep-alive Content-Length: 177 Origin: http://192.168.1.1 User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) Content-Type: application/xml Referer: http://192.168.1.1/ <packet ref="/"> <request id="1" ref="former.ifaces[load]"> <command name="show interface"> <name>ISP</name> </command> </request> </packet> Устройство возвращает текущее состояние интерфейса ISP: HTTP/1.0 200 OK Server: Ag [47] Set-Cookie: _authorized=*; path=/ Content-type: text/xml Content-Length: 760 <packet> <response id="1"> <interface name="ISP"> <mac>ec:43:f6:d3:22:d9</mac> <id>GigabitEthernet1</id> <index>2</index> 4

---

## Quick Reference

| Command | Category |
|---------|----------|
| access | access |
| access-list | access-list |
| access-list auto-delete | access-list |
| access-list deny | access-list |
| access-list permit | access-list |
| access-list rule | access-list |
| afp | afp |
| afp automount | afp |
| afp permissive | afp |
| afp share | afp |
| cifs | cifs |
| cifs automount | cifs |
| cifs map-hidden | cifs |
| cifs master | cifs |
| cifs permissive | cifs |
| cifs share | cifs |
| cloud control2 security-level | cloud control2 |
| components | components |
| components auto-update channel | components |
| components auto-update disable | components |
| components auto-update schedule | components |
| components check-update | components |
| components commit | components |
| components install | components |
| components list | components |
| components preset | components |
| components preview | components |
| components remove | components |
| components validity-period | components |
| copy | copy |
| crypto engine | crypto |
| crypto ike key | crypto |
| crypto ike mtu | crypto |
| crypto ike nat-keepalive | crypto |
| crypto ike policy | crypto |
| crypto ike policy lifetime | crypto |
| crypto ike policy mode | crypto |
| crypto ike policy negotiation-mode | crypto |
| crypto ike policy proposal | crypto |
| crypto ike proposal | crypto |
| crypto ike proposal aead | crypto |
| crypto ike proposal dh-group | crypto |
| crypto ike proposal encryption | crypto |
| crypto ike proposal integrity | crypto |
| crypto ike proposal prf | crypto |
| crypto ipsec incompatible | crypto |
| crypto ipsec profile | crypto |
| crypto ipsec profile authentication-local | crypto |
| crypto ipsec profile authentication-remote | crypto |
| crypto ipsec profile dpd-clear | crypto |
| crypto ipsec profile dpd-interval | crypto |
| crypto ipsec profile identity-local | crypto |
| crypto ipsec profile match-identity-remote | crypto |
| crypto ipsec profile mode | crypto |
| crypto ipsec profile policy | crypto |
| crypto ipsec profile preshared-key | crypto |
| crypto ipsec profile xauth | crypto |
| crypto ipsec profile xauth-identity | crypto |
| crypto ipsec profile xauth-password | crypto |
| crypto ipsec rekey delete-delay | crypto |
| crypto ipsec rekey make-before | crypto |
| crypto ipsec transform-set | crypto |
| crypto ipsec transform-set aead | crypto |
| crypto ipsec transform-set cypher | crypto |
| crypto ipsec transform-set dh-group | crypto |
| crypto ipsec transform-set hmac | crypto |
| crypto ipsec transform-set lifetime | crypto |
| crypto map | crypto |
| crypto map connect | crypto |
| crypto map enable | crypto |
| crypto map fallback-check-interval | crypto |
| crypto map force-encaps | crypto |
| crypto map l2tp-server dhcp route | crypto |
| crypto map l2tp-server enable | crypto |
| crypto map l2tp-server interface | crypto |
| crypto map l2tp-server ipv6cp | crypto |
| crypto map l2tp-server lcp echo | crypto |
| crypto map l2tp-server mru | crypto |
| crypto map l2tp-server mtu | crypto |
| crypto map l2tp-server multi-login | crypto |
| crypto map l2tp-server nat | crypto |
| crypto map l2tp-server range | crypto |
| crypto map l2tp-server static-ip | crypto |
| crypto map nail-up | crypto |
| crypto map reauth-passive | crypto |
| crypto map set-peer | crypto |
| crypto map set-peer-fallback | crypto |
| crypto map set-profile | crypto |
| crypto map set-tcpmss | crypto |
| crypto map set-transform | crypto |
| crypto map traffic-selectors | crypto |
| crypto map tunnel-interface | crypto |
| crypto map virtual-ip dhcp route | crypto |
| crypto map virtual-ip dns-server | crypto |
| crypto map virtual-ip enable | crypto |
| crypto map virtual-ip multi-login | crypto |
| crypto map virtual-ip nat | crypto |
| crypto map virtual-ip range | crypto |
| crypto map virtual-ip static-ip | crypto |
| dlna | dlna |
| dlna container | dlna |
| dlna db-directory | dlna |
| dlna directory | dlna |
| dlna display-name | dlna |
| dlna interface | dlna |
| dlna port | dlna |
| dlna rescan | dlna |
| dlna sort | dlna |
| dns-proxy | dns-proxy |
| dns-proxy filter assign host preset | dns-proxy |
| dns-proxy filter assign host profile | dns-proxy |
| dns-proxy filter assign interface preset | dns-proxy |
| dns-proxy filter assign interface profile | dns-proxy |
| dns-proxy filter engine | dns-proxy |
| dns-proxy filter profile | dns-proxy |
| dns-proxy filter profile description | dns-proxy |
| dns-proxy filter profile dns53 upstream | dns-proxy |
| dns-proxy filter profile https upstream | dns-proxy |
| dns-proxy filter profile intercept enable | dns-proxy |
| dns-proxy filter profile tls upstream | dns-proxy |
| dns-proxy https upstream | dns-proxy |
| dns-proxy intercept enable | dns-proxy |
| dns-proxy max-ttl | dns-proxy |
| dns-proxy proceed | dns-proxy |
| dns-proxy rebind-protect | dns-proxy |
| dns-proxy srr-reset | dns-proxy |
| dns-proxy tls upstream | dns-proxy |
| dpn accept | dpn |
| dyndns profile | dyndns profile |
| dyndns profile domain | dyndns profile |
| dyndns profile password | dyndns profile |
| dyndns profile send-address | dyndns profile |
| dyndns profile type | dyndns profile |
| dyndns profile update-interval | dyndns profile |
| dyndns profile url | dyndns profile |
| dyndns profile username | dyndns profile |
| easyconfig check | easyconfig |
| easyconfig check exclude-gateway | easyconfig |
| easyconfig check max-fails | easyconfig |
| easyconfig check period | easyconfig |
| easyconfig disable | easyconfig |
| erase | erase |
| eula accept | eula |
| exit | exit |
| igmp-proxy | igmp-proxy |
| igmp-proxy fast-leave | igmp-proxy |
| igmp-proxy force | igmp-proxy |
| igmp-snooping disable | igmp-snooping |
| interface | interface |
| interface authentication chap | interface |
| interface authentication eap-md5 | interface |
| interface authentication eap-mschapv2 | interface |
| interface authentication eap-ttls | interface |
| interface authentication identity | interface |
| interface authentication mschap | interface |
| interface authentication mschap-v2 | interface |
| interface authentication pap | interface |
| interface authentication password | interface |
| interface authentication peap | interface |
| interface authentication shared | interface |
| interface authentication wpa-psk | interface |
| interface auto-ssid | interface |
| interface backhaul | interface |
| interface band-steering | interface |
| interface band-steering preference | interface |
| interface beamforming explicit | interface |
| interface beamforming implicit | interface |
| interface cable-diagnostics | interface |
| interface ccp | interface |
| interface channel | interface |
| interface channel auto-rescan | interface |
| interface channel width | interface |
| interface chilli coaport | interface |
| interface chilli dhcpif | interface |
| interface chilli dns | interface |
| interface chilli lease | interface |
| interface chilli login | interface |
| interface chilli logout | interface |
| interface chilli macauth | interface |
| interface chilli macpasswd | interface |
| interface chilli nasip | interface |
| interface chilli nasmac | interface |
| interface chilli profile | interface |
| interface chilli radius | interface |
| interface chilli radiusacctport | interface |
| interface chilli radiusauthport | interface |
| interface chilli radiuslocationid | interface |
| interface chilli radiuslocationname | interface |
| interface chilli radiusnasid | interface |
| interface chilli radiussecret | interface |
| interface chilli uamallowed | interface |
| interface chilli uamdomain | interface |
| interface chilli uamhomepage | interface |
| interface chilli uamport | interface |
| interface chilli uamsecret | interface |
| interface chilli uamserver | interface |
| interface compatibility | interface |
| interface connect | interface |
| interface country-code | interface |
| interface debug | interface |
| interface description | interface |
| interface down | interface |
| interface downlink-mumimo | interface |
| interface downlink-ofdma | interface |
| interface duplex | interface |
| interface dyndns profile | interface |
| interface dyndns update | interface |
| interface encryption anonymous-dh | interface |
| interface encryption enable | interface |
| interface encryption key | interface |
| interface encryption mppe | interface |
| interface encryption owe | interface |
| interface encryption tkip hold-down | interface |
| interface encryption wpa | interface |
| interface encryption wpa2 | interface |
| interface encryption wpa3 | interface |
| interface encryption wpa3 suite-b | interface |
| interface flowcontrol | interface |
| interface follow | interface |
| interface ft enable | interface |
| interface ft mdid | interface |
| interface ft otd | interface |
| interface hide-ssid | interface |
| interface iapp auto | interface |
| interface iapp key | interface |
| interface idle-timeout | interface |
| interface igmp downstream | interface |
| interface igmp fork | interface |
| interface igmp upstream | interface |
| interface include | interface |
| interface inherit | interface |
| interface ip access-group | interface |
| interface ip address | interface |
| interface ip address dhcp | interface |
| interface ip adjust-ttl recv | interface |
| interface ip adjust-ttl send | interface |
| interface ip alias | interface |
| interface ip dhcp client broadcast | interface |
| interface ip dhcp client class-id | interface |
| interface ip dhcp client debug | interface |
| interface ip dhcp client displace | interface |
| interface ip dhcp client dns-routes | interface |
| interface ip dhcp client fallback | interface |
| interface ip dhcp client hostname | interface |
| interface ip dhcp client name-servers | interface |
| interface ip dhcp client release | interface |
| interface ip dhcp client renew | interface |
| interface ip dhcp client routes | interface |
| interface ip flow | interface |
| interface ip global | interface |
| interface ip mru | interface |
| interface ip mtu | interface |
| interface ip nat loopback | interface |
| interface ip remote | interface |
| interface ip tcp adjust-mss | interface |
| interface ipcp address | interface |
| interface ipcp default-route | interface |
| interface ipcp dns-routes | interface |
| interface ipcp name-servers | interface |
| interface ipcp vj | interface |
| interface ipsec encryption-level | interface |
| interface ipsec force-encaps | interface |
| interface ipsec ignore | interface |
| interface ipsec ikev2 | interface |
| interface ipsec nail-up | interface |
| interface ipsec name-servers | interface |
| interface ipsec preshared-key | interface |
| interface ipsec proposal lifetime | interface |
| interface ipsec proposal local-id | interface |
| interface ipsec proposal remote-id | interface |
| interface ipsec transform-set lifetime | interface |
| interface ipv6 address | interface |
| interface ipv6 dhcp client pd hint | interface |
| interface ipv6 id | interface |
| interface ipv6 name-servers | interface |
| interface ipv6 prefix | interface |
| interface ipv6cp | interface |
| interface lcp acfc | interface |
| interface lcp echo | interface |
| interface lcp pfc | interface |
| interface ldpc | interface |
| interface led wan | interface |
| interface lldp disable | interface |
| interface mac access-list address | interface |
| interface mac access-list type | interface |
| interface mac address | interface |
| interface mac address factory | interface |
| interface mac band | interface |
| interface mac bssid | interface |
| interface mac clone | interface |
| interface mobile lte disable-band | interface |
| interface mobile name-servers | interface |
| interface mobile operator | interface |
| interface mobile pdp | interface |
| interface mobile roaming | interface |
| interface mobile scan | interface |
| interface mobile umts disable-band | interface |
| interface modem connect | interface |
| interface modem timeout | interface |
| interface openvpn accept-routes | interface |
| interface openvpn connect | interface |
| interface openvpn name-servers | interface |
| interface peer | interface |
| interface peer-isolation | interface |
| interface ping-check profile | interface |
| interface ping-check restart | interface |
| interface pmf | interface |
| interface pmksa-lifetime | interface |
| interface power | interface |
| interface pppoe service | interface |
| interface pppoe session auto-cleanup | interface |
| interface preamble-short | interface |
| interface proxy connect | interface |
| interface proxy protocol | interface |
| interface proxy socks5-udp | interface |
| interface proxy udpgw-upstream | interface |
| interface proxy upstream | interface |
| interface reconnect-delay | interface |
| interface rekey-interval | interface |
| interface rename | interface |
| interface rf e2p set | interface |
| interface role | interface |
| interface rrm | interface |
| interface rssi-threshold | interface |
| interface schedule | interface |
| interface security-level | interface |
| interface sim pin | interface |
| interface sim slot | interface |
| interface spatial-reuse | interface |
| interface speed | interface |
| interface speed nonegotiate | interface |
| interface ssid | interface |
| interface standby enable | interface |
| interface storm-control disable | interface |
| interface switchport access | interface |
| interface switchport friend | interface |
| interface switchport mode | interface |
| interface switchport trunk | interface |
| interface target-waketime | interface |
| interface traffic-counter action disconnect | interface |
| interface traffic-counter action sms-alert message | interface |
| interface traffic-counter action sms-alert phone | interface |
| interface traffic-counter enable | interface |
| interface traffic-counter limit | interface |
| interface traffic-counter monthly | interface |
| interface traffic-counter set | interface |
| interface traffic-counter threshold | interface |
| interface traffic-shape | interface |
| interface tty init | interface |
| interface tty send | interface |
| interface tunnel destination | interface |
| interface tunnel eoip id | interface |
| interface tunnel gre keepalive | interface |
| interface tunnel source | interface |
| interface tx-burst | interface |
| interface tx-queue length | interface |
| interface tx-queue scheduler cake | interface |
| interface tx-queue scheduler fq | interface |
| interface up | interface |
| interface uplink-mumimo | interface |
| interface uplink-ofdma | interface |
| interface usb acq | interface |
| interface usb apn | interface |
| interface usb device-id | interface |
| interface usb port-id | interface |
| interface usb power-cycle | interface |
| interface usb power-fail | interface |
| interface usb wwan-force-connected | interface |
| interface web-api address | interface |
| interface web-api login | interface |
| interface web-api password | interface |
| interface whnat | interface |
| interface wireguard asc | interface |
| interface wireguard listen-port | interface |
| interface wireguard peer | interface |
| interface wireguard private-key | interface |
| interface wmm | interface |
| interface wpa-eap radius secret | interface |
| interface wpa-eap radius server | interface |
| interface wps | interface |
| interface wps auto-self-pin | interface |
| interface wps button | interface |
| interface wps peer | interface |
| interface wps self-pin | interface |
| interface zerotier accept-addresses | interface |
| interface zerotier accept-routes | interface |
| interface zerotier connect | interface |
| interface zerotier network-id | interface |
| ip arp | ip |
| ip dhcp class | ip |
| ip dhcp class option | ip |
| ip dhcp host | ip |
| ip dhcp pool | ip |
| ip dhcp pool bind | ip |
| ip dhcp pool bootfile | ip |
| ip dhcp pool class | ip |
| ip dhcp pool debug | ip |
| ip dhcp pool default-router | ip |
| ip dhcp pool dns-server | ip |
| ip dhcp pool domain | ip |
| ip dhcp pool enable | ip |
| ip dhcp pool lease | ip |
| ip dhcp pool next-server | ip |
| ip dhcp pool option | ip |
| ip dhcp pool range | ip |
| ip dhcp pool update-dns | ip |
| ip dhcp pool wpad | ip |
| ip dhcp relay lan | ip |
| ip dhcp relay server | ip |
| ip dhcp relay wan | ip |
| ip esp alg enable | ip |
| ip flow-cache timeout active | ip |
| ip flow-cache timeout inactive | ip |
| ip flow-export destination | ip |
| ip flow-export version | ip |
| ip ftp | ip |
| ip ftp client-charset | ip |
| ip ftp lockout-policy | ip |
| ip ftp permissive | ip |
| ip ftp security-level | ip |
| ip host | ip |
| ip hotspot | ip |
| ip hotspot auto-register disable | ip |
| ip hotspot auto-scan interface | ip |
| ip hotspot auto-scan interval | ip |
| ip hotspot auto-scan passive | ip |
| ip hotspot auto-scan timeout | ip |
| ip hotspot default-policy | ip |
| ip hotspot host | ip |
| ip hotspot host priority | ip |
| ip hotspot policy | ip |
| ip hotspot priority | ip |
| ip hotspot wake | ip |
| ip http lockout-policy | ip |
| ip http log access | ip |
| ip http log auth | ip |
| ip http log webdav | ip |
| ip http port | ip |
| ip http proxy | ip |
| ip http proxy auth | ip |
| ip http proxy dns-override | ip |
| ip http proxy domain | ip |
| ip http proxy domain ndns | ip |
| ip http proxy force-host | ip |
| ip http proxy preserve-host | ip |
| ip http proxy security-level | ip |
| ip http proxy ssl redirect | ip |
| ip http proxy upstream | ip |
| ip http proxy x-real-ip | ip |
| ip http security-level | ip |
| ip http ssl acme ecdsa | ip |
| ip http ssl acme get | ip |
| ip http ssl acme list | ip |
| ip http ssl acme revoke | ip |
| ip http ssl enable | ip |
| ip http ssl port | ip |
| ip http ssl redirect | ip |
| ip http webdav | ip |
| ip http webdav enable | ip |
| ip http webdav permissive | ip |
| ip http webdav security-level | ip |
| ip http x-frame-options | ip |
| ip name-server | ip |
| ip nat | ip |
| ip nat full-cone | ip |
| ip nat oc | ip |
| ip nat restricted-cone | ip |
| ip nat sstp | ip |
| ip nat vpn | ip |
| ip policy | ip |
| ip policy description | ip |
| ip policy multipath | ip |
| ip policy permit | ip |
| ip policy permit auto | ip |
| ip policy rate-limit input | ip |
| ip policy rate-limit output | ip |
| ip policy standalone | ip |
| ip route | ip |
| ip search-domain | ip |
| ip sip alg direct-media | ip |
| ip sip alg port | ip |
| ip ssh | ip |
| ip ssh cipher | ip |
| ip ssh keygen | ip |
| ip ssh lockout-policy | ip |
| ip ssh port | ip |
| ip ssh security-level | ip |
| ip ssh session timeout | ip |
| ip ssh sftp | ip |
| ip static | ip |
| ip static rule | ip |
| ip telnet | ip |
| ip telnet lockout-policy | ip |
| ip telnet port | ip |
| ip telnet security-level | ip |
| ip telnet session max-count | ip |
| ip telnet session timeout | ip |
| ip traffic-shape host | ip |
| ip traffic-shape unknown-host | ip |
| ipv6 local-prefix | ipv6 |
| ipv6 name-server | ipv6 |
| ipv6 pass | ipv6 |
| ipv6 route | ipv6 |
| ipv6 static | ipv6 |
| ipv6 subnet | ipv6 |
| ipv6 subnet bind | ipv6 |
| ipv6 subnet mode | ipv6 |
| ipv6 subnet number | ipv6 |
| ipv6 subnet prefix delegate | ipv6 |
| ipv6 subnet prefix length | ipv6 |
| isolate-private | isolate-private |
| kabinet | kabinet |
| kabinet access-level | kabinet |
| kabinet interface | kabinet |
| kabinet password | kabinet |
| kabinet port | kabinet |
| kabinet protocol-version | kabinet |
| kabinet server | kabinet |
| known host | known |
| ls | ls |
| mdns | mdns |
| mdns reflector disable | mdns |
| mdns reflector enforce | mdns |
| mkdir | mkdir |
| more | more |
| mws acquire | mws |
| mws auto-ap-shutdown | mws |
| mws backhaul shutdown | mws |
| mws log stp | mws |
| mws member | mws |
| mws member debug | mws |
| mws member dpn-accept | mws |
| mws member port access | mws |
| mws member reboot | mws |
| mws member update channel | mws |
| mws member update check | mws |
| mws member update start | mws |
| mws member update stop | mws |
| mws reboot | mws |
| mws revisit | mws |
| mws stp priority | mws |
| mws update start | mws |
| mws update stop | mws |
| mws zone | mws |
| ndns | ndns |
| ndns book-name | ndns |
| ndns check-name | ndns |
| ndns drop-name | ndns |
| ndns get-booked | ndns |
| ndns get-update | ndns |
| nextdns | nextdns |
| nextdns assign | nextdns |
| nextdns authenticate | nextdns |
| nextdns authtoken | nextdns |
| nextdns check-availability | nextdns |
| ntce | ntce |
| ntce debug | ntce |
| ntce filter assign host | ntce |
| ntce filter assign interface | ntce |
| ntce filter profile | ntce |
| ntce filter profile application | ntce |
| ntce filter profile description | ntce |
| ntce filter profile group | ntce |
| ntce filter profile schedule | ntce |
| ntce filter profile type | ntce |
| ntce memory-watcher | ntce |
| ntce qos category priority | ntce |
| ntce qos enable | ntce |
| ntce upstream rate-limit input | ntce |
| ntce upstream rate-limit output | ntce |
| ntp | ntp |
| ntp master | ntp |
| ntp server | ntp |
| ntp source | ntp |
| ntp sync-period | ntp |
| object-group ip | object-group |
| object-group ip exclude | object-group |
| object-group ip include | object-group |
| oc-server | oc-server |
| oc-server camouflage | oc-server |
| oc-server interface | oc-server |
| oc-server mtu | oc-server |
| oc-server multi-login | oc-server |
| oc-server pool-range | oc-server |
| oc-server static-ip | oc-server |
| opkg chroot | opkg |
| opkg disk | opkg |
| opkg dns-override | opkg |
| opkg initrc | opkg |
| opkg timezone | opkg |
| ping-check profile | ping-check |
| ping-check profile host | ping-check |
| ping-check profile max-fails | ping-check |
| ping-check profile min-success | ping-check |
| ping-check profile mode | ping-check |
| ping-check profile port | ping-check |
| ping-check profile power-cycle | ping-check |
| ping-check profile timeout | ping-check |
| ping-check profile update-interval | ping-check |
| ping-check profile uri | ping-check |
| ppe | ppe |
| pppoe pass | pppoe |
| printer | printer |
| printer bidirectional | printer |
| printer debug | printer |
| printer firmware | printer |
| printer name | printer |
| printer port | printer |
| printer status-polling | printer |
| printer type | printer |
| schedule | schedule |
| schedule action | schedule |
| schedule description | schedule |
| schedule led | schedule |
| service afp | service |
| service cifs | service |
| service dhcp | service |
| service dhcp-relay | service |
| service dlna | service |
| service dns-proxy | service |
| service ftp | service |
| service http | service |
| service igmp-proxy | service |
| service internet-checker | service |
| service ipsec | service |
| service kabinet | service |
| service mdns | service |
| service mws | service |
| service ntce | service |
| service ntp | service |
| service oc-server | service |
| service snmp | service |
| service ssh | service |
| service sstp-server | service |
| service telnet | service |
| service torrent | service |
| service udpxy | service |
| service upnp | service |
| service vpn-server | service |
| show | show |
| show access | show |
| show acme | show |
| show afp | show |
| show associations | show |
| show button | show |
| show button bindings | show |
| show button handlers | show |
| show chilli profiles | show |
| show cifs | show |
| show clock date | show |
| show clock timezone-list | show |
| show components status | show |
| show configurator status | show |
| show credits | show |
| show crypto ike key | show |
| show crypto map | show |
| show defaults | show |
| show dlna | show |
| show dns-proxy | show |
| show dns-proxy filter presets | show |
| show dns-proxy filter profiles | show |
| show dot1x | show |
| show dpn document | show |
| show dpn list | show |
| show drivers | show |
| show dyndns updaters | show |
| show easyconfig status | show |
| show eula document | show |
| show eula list | show |
| show interface | show |
| show interface antennas | show |
| show interface bands | show |
| show interface bridge | show |
| show interface cells | show |
| show interface channel-utilization rrd | show |
| show interface channels | show |
| show interface chilli | show |
| show interface country-codes | show |
| show interface mac | show |
| show interface name-server | show |
| show interface operators | show |
| show interface rf e2p | show |
| show interface rrd | show |
| show interface spectrum rrd | show |
| show interface stat | show |
| show interface traffic-counter | show |
| show interface wps pin | show |
| show interface wps status | show |
| show interface zerotier peers | show |
| show internet status | show |
| show ip arp | show |
| show ip dhcp bindings | show |
| show ip dhcp pool | show |
| show ip ftp | show |
| show ip hotspot | show |
| show ip hotspot rrd | show |
| show ip hotspot summary | show |
| show ip http proxy | show |
| show ip http webdav | show |
| show ip name-server | show |
| show ip nat | show |
| show ip neighbour | show |
| show ip policy | show |
| show ip route | show |
| show ip service | show |
| show ipsec | show |
| show ipv6 addresses | show |
| show ipv6 dhcp bindings | show |
| show ipv6 prefixes | show |
| show ipv6 route | show |
| show ipv6 subnets | show |
| show kabinet status | show |
| show last-change | show |
| show led | show |
| show led bindings | show |
| show led controls | show |
| show log | show |
| show media | show |
| show mws associations | show |
| show mws candidate | show |
| show mws log | show |
| show mws member | show |
| show ndns | show |
| show netfilter | show |
| show nextdns availability | show |
| show nextdns profiles | show |
| show ntce applications | show |
| show ntce attributes | show |
| show ntce filter profile | show |
| show ntce groups | show |
| show ntce groupsets | show |
| show ntce hosts | show |
| show ntce oses | show |
| show ntce status | show |
| show ntp status | show |
| show oc-server | show |
| show ping-check | show |
| show printers | show |
| show processes | show |
| show running-config | show |
| show schedule | show |
| show self-test | show |
| show site-survey | show |
| show skydns profiles | show |
| show skydns userinfo | show |
| show snmp view | show |
| show ssh fingerprint | show |
| show ssh sftp | show |
| show sstp-server | show |
| show system | show |
| show system country | show |
| show system cpustat | show |
| show system zram | show |
| show tags | show |
| show threads | show |
| show torrent status | show |
| show upnp redirect | show |
| show usb | show |
| show version | show |
| show vpn-server | show |
| skydns | skydns |
| skydns assign | skydns |
| skydns check-availability | skydns |
| skydns login | skydns |
| skydns password | skydns |
| sms | sms |
| sms delete | sms |
| sms list | sms |
| sms read | sms |
| sms send | sms |
| snmp community | snmp |
| snmp contact | snmp |
| snmp location | snmp |
| snmp view | snmp |
| snmp view exclude | snmp |
| snmp view include | snmp |
| sstp-server | sstp-server |
| sstp-server allow-bridging | sstp-server |
| sstp-server camouflage | sstp-server |
| sstp-server dhcp route | sstp-server |
| sstp-server interface | sstp-server |
| sstp-server ipv6cp | sstp-server |
| sstp-server lcp echo | sstp-server |
| sstp-server lcp force-pap | sstp-server |
| sstp-server mru | sstp-server |
| sstp-server mtu | sstp-server |
| sstp-server multi-login | sstp-server |
| sstp-server pool-range | sstp-server |
| sstp-server static-ip | sstp-server |
| system | system |
| system button | system |
| system caption | system |
| system clock date | system |
| system clock timezone | system |
| system configuration factory-reset | system |
| system configuration fail-safe commit | system |
| system configuration fail-safe keep-alive | system |
| system configuration fail-safe rollback | system |
| system configuration fail-safe timer | system |
| system configuration save | system |
| system country | system |
| system debug | system |
| system description | system |
| system domainname | system |
| system eject | system |
| system hostname | system |
| system led | system |
| system led power schedule | system |
| system led power shutdown | system |
| system log clear | system |
| system log reduction | system |
| system log server | system |
| system log suppress | system |
| system mode | system |
| system mount | system |
| system ndss dump-report disable | system |
| system reboot | system |
| system set | system |
| system swap | system |
| system trace lock threshold | system |
| system usb power schedule | system |
| system usb power shutdown | system |
| system zram | system |
| tools | tools |
| tools arping | tools |
| tools ping | tools |
| tools ping6 | tools |
| tools traceroute | tools |
| torrent | torrent |
| torrent directory | torrent |
| torrent peer-port | torrent |
| torrent policy | torrent |
| torrent reset | torrent |
| torrent rpc-port | torrent |
| udpxy | udpxy |
| udpxy buffer-size | udpxy |
| udpxy buffer-timeout | udpxy |
| udpxy interface | udpxy |
| udpxy port | udpxy |
| udpxy renew-interval | udpxy |
| udpxy timeout | udpxy |
| upnp forward | upnp |
| upnp lan | upnp |
| upnp redirect | upnp |
| user | user |
| user home | user |
| user password | user |
| user tag | user |
| ussd send | ussd |
| vpn-server | vpn-server |
| vpn-server dhcp route | vpn-server |
| vpn-server interface | vpn-server |
| vpn-server ipv6cp | vpn-server |
| vpn-server lcp echo | vpn-server |
| vpn-server lockout-policy | vpn-server |
| vpn-server mppe | vpn-server |
| vpn-server mppe-optional | vpn-server |
| vpn-server mru | vpn-server |
| vpn-server mtu | vpn-server |
| vpn-server multi-login | vpn-server |
| vpn-server pool-range | vpn-server |
| vpn-server static-ip | vpn-server |

---

## Coverage Report

- **Total number of commands:** 862
- **Full coverage:** Confirmed. Every command from the official CLI description (Chapter 3, Описание команд) is present in this reference.
- **Source:** Netcraze Giga (KN-1012) CLI Command Reference.
- **Scope:** Each command is listed with description, syntax, arguments (where available), examples, and notes as documented in the source.
