# -*- coding: utf-8 -*-

import re
from datetime import datetime
from random import randint

# Resource
POSTFIX = re.compile(r'\.([^.]*)$')
def upload_to(directory, filename):
    ext_match = POSTFIX.search(filename)
    ext = ext_match.group(1) if ext_match else ''
    resource_name = ''.join([str(randint(0, 9)) for _ in range(11)])
    resource_filename = '%s.%s' % (resource_name, ext)
    now = datetime.utcnow()
    return '%s/%04d/%02d/%02d/%s' % (directory, now.year,
            now.month, now.day, resource_filename)

# Progress

def format_clock_indication(epoch):
    """Transform an integer number into a clock indication string.

    >>> format_progress(0)
    "0:00:00.00"
    >>> format_progress(5)
    "0:00:05.00"
    >>> format_progress(75)
    "0:01:05.00"
    """
    millisecond = epoch % 100
    epoch = epoch / 100
    second = epoch % 60
    epoch = epoch / 60
    minute = epoch % 60
    epoch = epoch / 60
    hour = epoch % 24
    return '%d:%02d:%02d.%02d' % (hour, minute, second, millisecond)
