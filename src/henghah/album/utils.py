# -*- coding: utf-8 -*-

import re
from random import randint
# Resource
POSTFIX = re.compile(r'\.(.*)$')
def upload_to(directory, filename):
    ext_match = POSTFIX.search(filename)
    ext = ext_match.group(1) if ext_match else ''
    resource_name = ''.join([str(randint(0, 9)) for _ in range(11)])
    resource_filename = '%s.%s' % (resource_name, ext)
    return '{0}/%Y/%m/%d/{1}'.format(directory, resource_filename)

